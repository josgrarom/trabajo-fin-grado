import React from 'react';
import { Nav, Navbar, NavItem, NavLink } from 'reactstrap';

function Userbar(){
  return (
    <>
      <Navbar light className="navbar-transparente"  container ="fluid"  expand="md" >
        <Nav className="navbarUser" navbar>
          <NavItem>
            <NavLink href='/profile'>Perfil</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/gamesList'>Juegos</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/followsList'>Siguiendo</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/reviewsList'>Reviews</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/profileData'>Ajustes</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
};

export default Userbar;