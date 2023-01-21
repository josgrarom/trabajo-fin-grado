import React from 'react';
import {   Nav,
  NavLink,
  NavMenu,
  NavBtn,
  NavBtnLink } from './NavBarElements';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
          Home
        </NavLink>
   
        <NavMenu>
          <NavLink to='/about' activeStyle>
            About
          </NavLink>
          <NavLink to='/aux' activeStyle>
            Aux
          </NavLink>
          <NavLink to='/user-profile' activeStyle>
            Pefil
          </NavLink>
          <NavLink to='/sign-up' activeStyle>
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