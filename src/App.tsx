import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { initializeApp } from "firebase/app";
import Leagues from "./pages/Leagues";
import Profile from "./pages/Profile";
import { ACTIONS, useStore } from "./components/Store";
import { useToast } from '@chakra-ui/react';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiD2W9_5blttzHb_8qQHLbdgWRWywYHXw",
  authDomain: "cr-league-49a85.firebaseapp.com",
  databaseURL: "https://cr-league-49a85-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cr-league-49a85",
  storageBucket: "cr-league-49a85.appspot.com",
  messagingSenderId: "389420535228",
  appId: "1:389420535228:web:a7e9fb195ac0b26cc5afb9"
};

// Initialize Firebase
initializeApp(firebaseConfig);

function App() {
  const [state, dispatch] = useStore()
  const toast = useToast()

  useEffect(() => {
    if (state.message) {
      toast({
        description: state.message.description,
        status: state.message.status,
        duration: 10000,
        isClosable: true
      })
      dispatch({type: ACTIONS.REMOVE_MESSAGE})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="leagues" element={<Leagues/>}/>
        <Route path="profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
