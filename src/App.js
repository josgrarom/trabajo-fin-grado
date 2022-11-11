import './App.css';
import Home from './views/home/Home';
import {firebaseConfig} from './api/firebaseConfig'
import Login from './views/login/Login'
import React,{useEffect} from "react";
import AuthenticatedHome from './views/authenticatedHome/AuthenticatedHome';
function App() {
  const[usuario,setUsuario] = React.useState(null);
  useEffect( ()=>{
    firebaseConfig.auth().onAuthStateChanged((usuarioFirebase)=>{
      console.log("ya tienes sesión iniciada con:",usuarioFirebase);
      setUsuario(usuarioFirebase);
    })
  },[])
  return <>{usuario ? <AuthenticatedHome/> : <Login setUsuario={setUsuario}/>}</>;
 
}

export default App;
