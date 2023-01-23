import React, { useState } from 'react'
import './Game.css'
import {auth,db} from '../../api/firebaseConfig'
import { doc,updateDoc,arrayUnion } from "firebase/firestore";
import Modal from '../modal/Modal';
import ShowLists from '../showLists/showLists';

function Game(props){
  const [modalState,setModalState]= useState(false);
  const addGame = async()=>{
    const user = auth.currentUser;
    const collectionRef = doc(db, "users/",user.uid);
    await updateDoc(collectionRef, {
      username: 'test2',
      email:user.email,
      'listas.lista1':arrayUnion(props.idGame)
    });
  }
  
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