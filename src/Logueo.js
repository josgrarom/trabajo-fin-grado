import React from "react";
import {firebaseConfig} from './api/firebaseConfig'
function Logueo(props) {

  const[isRegistrando, setIsRegistrando] = React.useState(false);
  
  const crearUsuario = (correo,password) =>{
    firebaseConfig
    .auth()
    .createUserWithEmailAndPassword(correo,password)
    .then((usuarioFirebase)=>{
      console.log("usuario creado:",usuarioFirebase);
      props.setUsuario(usuarioFirebase);
    });
  };

  const iniciarSesión = (correo,password) =>{
    firebaseConfig
    .auth()
    .signInWithEmailAndPassword(correo,password)
    .then((usuarioFirebase)=>{
      console.log("usuario creado:",usuarioFirebase);
      props.setUsuario(usuarioFirebase);
    });
  };
  const submitHandler = (e)=>{
    e.preventDefault();
    const correo= e.target.emailField.value;
    const password = e.target.passwordField.value;
    if (isRegistrando){
      crearUsuario(correo,password);
    }

    if(!isRegistrando){
      iniciarSesión(correo,password);
    }
  };

  return (  

    <div>
      <h1>{isRegistrando ? "Registrate":"Iniciar sesión"}</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="emailField">Correo</label>
        <input type="email" id="emailField" />
        <label htmlFor="passwordField">Contraseña</label>
        <input type="password" id="passwordField"/>
        <button type="submit">{isRegistrando ? "Registrate":"Iniciar sesión"}</button>
      </form>
      <button onClick={()=> setIsRegistrando(!isRegistrando)}>
        {isRegistrando ? "¿Ya tienes cuenta? ¡Inicia sesión!":"¿No tienes cuenta? ¡Registrate gratis!"}
      </button>
    </div>
  );
}

export default Logueo;