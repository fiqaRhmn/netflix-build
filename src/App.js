import React, { useEffect, useState } from 'react';
import './App.css';
import Homescreen from './screens/Homescreen';
import Login from './screens/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
}from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  const userAuth = useSelector(selectUser);
  const dispatch = useDispatch();
  //const userAuth = null;
  
  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //logged in
        dispatch(login({
          uid: user.uid,
          email: user.email
        }));
      } else {
        //logged out
        dispatch(logout());
      }
    });

    return unsubscribe;
  },[dispatch]);

  return (
    <div className="app">
      <Router>
        
          {!userAuth ?(
          <Login /> 
        )
        :(
          <Routes>
            <Route exact path="/" element={<Homescreen />} />
            <Route exact path="/profile" element={<ProfileScreen />} />
          </Routes>
        )}
        
    </Router>
    </div>
  );
}

export default App;
