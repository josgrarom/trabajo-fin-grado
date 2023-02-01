import React, { useEffect, useState } from 'react'
import './Game.css'
import Modal from '../modal/Modal';
import ShowLists from '../showLists/showLists';
import { Link } from 'react-router-dom';
function Game(props){
  const [modalState,setModalState]= useState(false);
  

  return (
    <Link to={`/game/${props.idGame}`}>
    <div className='gameContainer'>
      {<img
        className='gameImg'
        src={props.image}
        alt=''
      />}
      <p className='gameName'>{props.name}</p>
      {props.addButton&&
      <button className="button" onClick={()=> setModalState(!modalState)}>
        Añadir juego
      </button>
      }

      <Modal state={modalState} changeState={setModalState}>
        <ShowLists
        idGame={props.idGame}
        />
      </Modal>
    </div>
    </Link>
  )
}

export default Game;