import React from 'react'
import './Game.css'
import {auth,db} from '../../api/firebaseConfig'
import { doc,updateDoc,arrayUnion } from "firebase/firestore";

function Game(props){
  
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

      <button className="button" onClick={addGame}>
        Añadir juego
      </button>
    </div>
  )
}

export default Game;