import React, {  useState } from 'react'
import './Game.css'
import Modal from '../modal/Modal';
import ShowLists from '../showLists/showLists';
import { Link } from 'react-router-dom';
function Game(props){
  const [modalState,setModalState]= useState(false);
  

  return (
    
    <div className='gameContainer'>
      <Link to={`/game/${props.idGame}`}>
      {<img
        className='gameImg'
        src={props.image}
        alt=''
      />}
      
      <p className='gameName'>{props.name}</p>
      </Link>
      {props.addButton&&
      <button className="button" onClick={()=> setModalState(!modalState)}>
        Añadir juego
      </button>
      }

      <Modal state={modalState} changeState={setModalState}>
      <button className="button" onClick={()=> setModalState(!modalState)}>
        <ShowLists
        idGame={props.idGame}
        />
        </button>
      </Modal>
    </div>

  )
}

export default Game;