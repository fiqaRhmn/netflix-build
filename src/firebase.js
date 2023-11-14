
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv4aXyX5FYWwSki6SrtAGtROyQqX9OR9E",
  authDomain: "netflix-clone-4c2d2.firebaseapp.com",
  projectId: "netflix-clone-4c2d2",
  storageBucket: "netflix-clone-4c2d2.appspot.com",
  messagingSenderId: "967041462176",
  appId: "1:967041462176:web:4ec6702d55fd31961a3ec5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth };
export default db;