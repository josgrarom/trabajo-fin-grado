import React from 'react';
import {   Nav,
  NavLink,
  NavMenu,
  NavBtn,
  NavBtnLink } from './NavBarElements';
  import Logo from '../../constants/Logo.js';
const Navbar = () => {
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
          <NavLink to='/aux' >
            Aux
          </NavLink>
          <NavLink to='/user-profile' >
            Pefil
          </NavLink>
          <NavLink to='/sign-up' >
            Sign Up
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;