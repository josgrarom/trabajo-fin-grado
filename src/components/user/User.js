import React, {  useState } from 'react'

import { Card, CardTitle } from 'reactstrap';
function User(props){

  return ( 
    <div>
      <div className='gameContainer'>
      <Card>
        {<img
            className='gameImg'
            src={require(`/src/images/${props.image}`)}
            alt=''
          />}
          <CardTitle  className='gameName'>
            <p>{props.username}</p>
          </CardTitle>
          <CardTitle  className='gameName'>
            <p>{props.email}</p>
          </CardTitle>
      </Card>
      </div>
    </div>

  )
}

export default User;