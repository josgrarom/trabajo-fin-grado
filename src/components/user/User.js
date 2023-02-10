import React, {  useState } from 'react'

import { Link } from 'react-router-dom';
function User(props){

  return (
    
    <div >
      

      <p>{props.id}</p>
      <p>{props.username}</p>
      <p>{props.email}</p>
      
    </div>

  )
}

export default User;