import './App.css';
import Home from './views/home/Home';
import {firebaseConfig} from './api/firebaseConfig'
import Logueo from './Logueo'
import React,{useEffect} from "react";
function App() {
  const[usuario,setUsuario] = React.useState(null);
  useEffect( ()=>{
    firebaseConfig.auth().onAuthStateChanged((usuarioFirebase)=>{
      console.log("ya tienes sesión iniciada con:",usuarioFirebase);
      setUsuario(usuarioFirebase);
    })
  },[])
  return <>{usuario ? <Home/> : <Logueo setUsuario={setUsuario}/>}</>;
 
}

export default App;
