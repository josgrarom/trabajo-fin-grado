import React, { useState } from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
} from 'reactstrap';

import { auth } from '../../api/firebaseConfig';
import SignOut from '../signOut/SignOut';

function NaveBar(args){

  const user = auth.currentUser;
  return (
    <>

      <Navbar dark="true" container ="fluid" color="dark"  expand="md" sticky="top" >
        <NavbarBrand href="/">reactstrap</NavbarBrand>
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
        </Nav>

          <NavbarText>        {!user?(
        <div>
        <Button>
          <NavLink href='/log-in'>Iniciar sesión</NavLink>
        </Button>
        <Button>
          <NavLink href='/sign-up'>Registrarse</NavLink>
        </Button>
        </div>
        ):(<SignOut/>)}</NavbarText>

      </Navbar>

    </>
  );
};

export default NaveBar;