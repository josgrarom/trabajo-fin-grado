import React from 'react'
import './Game.css'
function Game(props){
  return (

    <div className='gameContainer'>
{       <img
        className='gameImg'
        src={props.image}
        alt=''
      /> }
      <p className='gameName'>{props.name}</p>
      
{/*       <div className='gameStatisticsContainer'>
        <div className='gameStatistics'>
          <p className='gamePlayers'>Jugadores activos: {props.players}.</p>
          <p className='gameHours'>Media de horas: {props.hours}.</p>
          <p className='gameRating'>Puntuación: {props.rating}.</p>
          <p className='gameReviews'>{props.reviews} reviews registradas.</p>
        </div>
      </div> */}
    </div>

  )
}

export default Game;