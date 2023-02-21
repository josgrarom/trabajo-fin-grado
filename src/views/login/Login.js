import React from "react";

import {firebaseConfig} from '../../api/firebaseConfig'
function LogIn(props) {
  const loginUser= (email,password)=>{
      firebaseConfig
      .auth()
      .signInWithEmailAndPassword(email,password)
      .then((firebaseUser)=>{
        console.log("usuario logueado:",firebaseUser.user.email);
        props.setUser(firebaseUser)
        window.location.reload(false);
      })
  };

  function submitHandler (e){
    
    e.preventDefault();
    const email= e.target.emailField.value;
    const password = e.target.passwordField.value;
    return(loginUser(email,password));
};
  return (  

    <div>
      <h1>{"Iniciar Sesión"}</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="emailField">email</label>
        <input type="email" id="emailField" />
        <label htmlFor="passwordField">Contraseña</label>
        <input type="password" id="passwordField"/>
        <button type="submit">{"Iniciar sesión"}</button>
      </form>
      <button>
       Iniciar Sesión
      </button>
    </div>
  );
}
export default LogIn;