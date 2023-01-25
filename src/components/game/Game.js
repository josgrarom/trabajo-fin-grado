import React, { useState } from 'react'
import './Game.css'
import Modal from '../modal/Modal';
import ShowLists from '../showLists/showLists';

function Game(props){
  const [modalState,setModalState]= useState(false);

  
  return (
    <div className='gameContainer'>
      {<img
        className='gameImg'
        src={props.image}
        alt=''
      />}
      <p className='gameName'>{props.name}</p>

      <button className="button" onClick={()=> setModalState(!modalState)}>
        Añadir juego
      </button>
      <Modal state={modalState} changeState={setModalState}>
        <ShowLists
        idGame={props.idGame}
        />
      </Modal>
    </div>
  )
}

export default Game;