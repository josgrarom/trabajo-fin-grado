import React, {  useState } from 'react'
import './Game.css'
import { Link } from 'react-router-dom';
function Game(props){
  return (
    <Link to={`/game/${props.idGame}`}>
      <div className='gameContainer'>
        {<img
          className='gameImg'
          src={props.image}
          alt=''
        />}
        <h1 className='gameName'>{props.name}</h1>
      </div>
    </Link>
  )
}

export default Game;