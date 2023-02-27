import React from 'react';
import {   Nav,
  NavLink,
  NavMenu} from './NavBarElements';
const Userbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
        <NavLink to='/profile' >
            Perfil
          </NavLink>
          <NavLink to='/profileData' >
            Datos personales
          </NavLink>
          <NavLink to='/gamesList' >
            Juegos
          </NavLink>
          <NavLink to='/followsList' >
            Siguiendo
          </NavLink>
          <NavLink to='/reviewsList' >
            Reviews
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Userbar;