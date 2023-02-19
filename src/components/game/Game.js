import React, {  useState } from 'react'
import './Game.css'

function Game(props){
  
  return (
    
    <div className='gameContainer'>
      {<img
        className='gameImg'
        src={props.image}
        alt=''
      />}
      <h1 className='gameName'>{props.name}</h1>
    </div>

  )
}

export default Game;