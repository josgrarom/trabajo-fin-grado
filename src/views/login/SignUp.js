import React from "react";
import {firebaseConfig} from '../../api/firebaseConfig'

function SignUp(props) {

  const createUser =(email,password)=>{
    return(
      firebaseConfig
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .then((firebaseUser)=>{
      console.log("usuario creado:",firebaseUser);
      props.setUser(firebaseUser);
      window.location.reload(false);
      })
    );
  };

  const submitHandler= (e)=>{
    e.preventDefault();
    const email= e.target.emailField.value;
    const password = e.target.passwordField.value;
    return(createUser(email,password));
  };
  
  return (  
    <div>
      <h1>{"Registrate"}</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="emailField">email</label>
        <input type="email" id="emailField" />
        <label htmlFor="passwordField">Contraseña</label>
        <input type="password" id="passwordField"/>
        <button type="submit">{"Registrate"}</button>
      </form>
      <button>
       Registrarse
      </button>
    </div>
  );
}
export default SignUp;