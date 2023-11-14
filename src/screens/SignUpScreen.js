import React, { useRef } from "react";
import "./SignUpScreen.css";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function SignUpScreen() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);


    function signIn(e) {
        e.preventDefault();

        signInWithEmailAndPassword(
            auth,
            emailRef.current.value, 
            passwordRef.current.value
        ).then((authUser) =>{
            console.log(authUser);
        });
    };

    function register(e){
        e.preventDefault();

        createUserWithEmailAndPassword(
            auth,
            emailRef.current.value, 
            passwordRef.current.value
        )
        .then((authUser) =>{
            console.log(authUser);
        })
        .catch((error) => {
            alert(error.message);
        });
    };

  return (
    <div className="signupScreen">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="Password" type="password" />
        <button onClick={(e)=>signIn(e)} type="submit">Sign In</button>
      </form>

      <h4>
        <span className="signupScreen__gray">New to Netflix?</span>
        <span className="signupScreen__link" onClick={(e)=>register(e)}>Sign Up Now</span>
      </h4>

    </div>
  );
}

export default SignUpScreen;
