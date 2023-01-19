import './App.css';
/* import Home from './views/home/Home'; */
import {firebaseConfig} from './api/firebaseConfig'
import Login from './views/login/Login'
import React,{useEffect} from "react";
import AuthenticatedHome from './views/authenticatedHome/AuthenticatedHome';
import SesionTest from './views/authenticatedHome/SesionTest';
function App() {
  const[user,setUser] = React.useState(null);
  
  useEffect( ()=>{
    firebaseConfig.auth().onAuthStateChanged((firebaseUser)=>{
      console.log("ya tienes sesión iniciada con:",firebaseUser);
      setUser(firebaseUser);
    })
  },[])
  return <>{user ? <AuthenticatedHome/> : <Login setUser={setUser}/>}</>;
 
}

export default App;
