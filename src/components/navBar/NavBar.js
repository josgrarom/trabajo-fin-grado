import React from 'react';
import {   Nav,
  NavLink,
  NavMenu,
  NavBtn,
  NavBtnLink } from './NavBarElements';
  import { auth } from '../../api/firebaseConfig';
import SignOut from '../signOut/SignOut';
const Navbar = () => {
  const user = auth.currentUser;
  return (
    <>
      <Nav>
        <NavLink to='/'>
          Home
        </NavLink>
   
        <NavMenu>
          <NavLink to='/about' >
            About
          </NavLink>
          <NavLink to='/users' >
            Usuarios
          </NavLink>
          <NavLink to='/user-profile' >
            Pefil
          </NavLink>
        </NavMenu>
      
        {!user?(
        <div>
        <NavBtn>
          <NavBtnLink to='/log-in'>Iniciar sesión</NavBtnLink>
        </NavBtn>
        <NavBtn>
          <NavBtnLink to='/sign-up'>Registrarse</NavBtnLink>
        </NavBtn>
        </div>
        ):(<NavBtn><SignOut/></NavBtn>)}
      </Nav>
    </>
  );
};

export default Navbar;