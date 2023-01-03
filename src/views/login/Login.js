import React from "react";
import {firebaseConfig} from '../../api/firebaseConfig'

function Login(props) {

  const[isRegistering, setIsRegsitering] = React.useState(false);
  
  function createUser (email,password){
    return(
      firebaseConfig
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .then((firebaseUser)=>{
      console.log("usuario creado:",firebaseUser);
      props.setUser(firebaseUser);
      })
    );
  };

  function loginUser(email,password){
    return(
      firebaseConfig
      .auth()
      .signInWithEmailAndPassword(email,password)
      .then((firebaseUser)=>{
        console.log("usuario logueado:",firebaseUser.credential);
        props.setUser(firebaseUser);
      })
    );
  };

  function submitHandler (e){
    
      e.preventDefault();
      const email= e.target.emailField.value;
      const password = e.target.passwordField.value;
      
      if (isRegistering){
        return(createUser(email,password));
      }

      if(!isRegistering){
        return(loginUser(email,password));
      }
  };

  return (  

    <div>
      <h1>{isRegistering ? "Registrate":"Iniciar sesión"}</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="emailField">email</label>
        <input type="email" id="emailField" />
        <label htmlFor="passwordField">Contraseña</label>
        <input type="password" id="passwordField"/>
        <button type="submit">{isRegistering ? "Registrate":"Iniciar sesión"}</button>
      </form>
      <button onClick={()=> setIsRegsitering(!isRegistering)}>
        {isRegistering ? "¿Ya tienes cuenta? ¡Inicia sesión!":"¿No tienes cuenta? ¡Registrate gratis!"}
      </button>
    </div>
  );
}

export default Login;