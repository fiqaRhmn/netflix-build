import React, { useEffect, useState } from 'react'
import "./PlanScreen.css"
import db from '../firebase';
import { getDocs, onSnapshot, collection, query, where, addDoc, doc } from "firebase/firestore";
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';

function PlanScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        const dofRef = doc(db, "customers", user.uid);
        const collectionRef = (collection(dofRef, 'payments'));
        console.log("collectionRef",collectionRef);

        const unsub = onSnapshot(collectionRef, async(querySnapshot) => {
            querySnapshot.forEach(async(subscription) => {
                console.log("subscription",subscription);
                setSubscription({
                    role: subscription.role,
                    // current_period_end: subscription.data().period_end.seconds,
                    // current_period_start: subscription.data().period_start.seconds,
                })
            });
        });

        return () => unsub();
    },[user.uid]);
    

    useEffect(() => {
        const collectionRef = query(collection(db, 'products'), where("active", "==", true));
    
        const unsub = onSnapshot(collectionRef, async (querySnapshot) => {
            const products = {};
           for(const productDoc of querySnapshot.docs) {
                products[productDoc.id] = productDoc.data();

                const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
                for (const price of priceSnap.docs) {
                    products[productDoc.id].price = {
                      priceId: price.id,
                      priceData: price.data(),
                    };
                };
           };
            setProducts(products);
        });
        // Unsubscribe from the snapshot listener when the component unmounts
        return () => unsub();
    }, []); // Add db to dependency array if it's a prop or state

    console.log(products);
    console.log(subscription);

    const loadCheckOut = async (priceId) => {
        const stripe = await loadStripe('pk_test_51OALXoKkI6G3L2Fkuf5nG7KaLFyzdAliy96XSzV4R0iNEbIb7HfJdgJRNMQlAOJIt04x3t6lppDl1Ib5WCe47qoD00p3wJUtf6'); // Your Stripe public key

        // Create a checkout session in Firebase
        const docRef = doc(db, "customers", user.uid);
        const colRef = collection(docRef, "checkout_sessions");
        const sessionDocRef = await addDoc(colRef, {
            line_items: [{
                price: priceId,
                quantity: 1, // Assuming a quantity of 1 for simplicity
            }],
            success_url: window.location.origin, 
            cancel_url: window.location.origin
        });
        
        // Listen for changes in the specific checkout session document
        onSnapshot(sessionDocRef, async (snapshot) => {
            const { error, sessionId } = snapshot.data();
            console.log(snapshot.data());
            console.log(error);
            console.log(sessionId);
        
            if (error) {
                alert(`An error occurred: ${error.message}`);
            }
        
            if (sessionId) {
                // Redirect to Stripe checkout
                stripe.redirectToCheckout({ sessionId });
            }
        });
        
    };
    

  return (
    <div>
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);

        return (
            <div className='planScreen__plan' key={productId}>
            <div className='planScreen__info'>
                <h5>{productData.name}</h5>
                <h6>{productData.description}</h6>
            </div>
            <button onClick={() => !isCurrentPackage && [loadCheckOut(productData.price.priceId)]}>
                {isCurrentPackage?"Current package" : "Subscribe"}
            </button>
        </div>
        )
        
        })}
    </div>
  )
}

export default PlanScreen
