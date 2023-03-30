import React, { useState } from 'react';

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

import { auth } from '../../api/firebaseConfig';
import SignOut from '../signOut/SignOut';
import {firebaseConfig} from '../../api/firebaseConfig'
function NaveBar(){
  const user = auth.currentUser;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);


  const loginUser= (email,password)=>{
    firebaseConfig
    .auth()
    .signInWithEmailAndPassword(email,password)
    .then((firebaseUser)=>{
      console.log("usuario logueado:",firebaseUser.user.email);
      window.location.reload(false);
    })
};

function submitHandler (e){
  
  e.preventDefault();
  const email= e.target.emailField.value;
  const password = e.target.passwordField.value;
  return(loginUser(email,password));
};

const createUser =(email,password)=>{
  return(
    firebaseConfig
    .auth()
    .createUserWithEmailAndPassword(email,password)
    .then((firebaseUser)=>{
      console.log("usuario creado:",firebaseUser);
      window.location.reload(false);
    })
  );
};

const submitHandler2= (e)=>{
  e.preventDefault();
  const email= e.target.emailField.value;
  const password = e.target.passwordField.value;
  return(createUser(email,password));
};

  return (
    <>
      <Navbar dark="true" container ="fluid" color="dark"  expand="md" sticky="top" >
        <NavbarBrand href="/">Games4U</NavbarBrand>
         {user&&
        <Nav  navbar>
        <NavItem>
            <NavLink href="/about">Sobre nosotros</NavLink>
        </NavItem>
        <NavItem>
              <NavLink href="/users">Usuarios</NavLink>
              </NavItem>
              <NavItem>
              <NavLink href="/user-profile">Perfil</NavLink>
              </NavItem>
        </Nav>}
          <NavbarText>        {!user?(
        <div>
        <Button size="sm" color="link" onClick={toggle}>
          Iniciar sesión
        </Button >
        <Button size="sm" color="link" onClick={toggle2}>
          Registrarse
        </Button>
        </div>
        ):(<SignOut/>)}</NavbarText>

      </Navbar>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Iniciar sesión</ModalHeader>
        <ModalBody>
        <div className='loginContainer'>
          <form onSubmit={submitHandler}>
            <div className='emailContainer'>
              <label htmlFor="emailField">Email</label>
              <input type="email" id="emailField"/>
            </div>
            <div className='passwordContainer'>
              <label htmlFor="passwordField">Contraseña</label>
              <input type="password" id="passwordField"/>
            </div>
            <Button type="submit">Iniciar sesión</Button>
          </form>
        </div>
        </ModalBody>
      </Modal>

      <Modal isOpen={modal2} toggle={toggle2}>
        <ModalHeader toggle={toggle2}>Registrate</ModalHeader>
        <ModalBody>
        <div className='loginContainer'>
          <form onSubmit={submitHandler2}>
            <div className='emailContainer'>
              <label htmlFor="emailField">Email</label>
              <input type="email" id="emailField" />
            </div>
            <div className='passwordContainer'>
              <label htmlFor="passwordField">Contraseña</label>
              <input type="password" id="passwordField"/>
            </div>
            <Button type="submit">Registrate</Button>
          </form>
        </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default NaveBar;