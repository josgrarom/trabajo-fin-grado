import React, {  useEffect, useState } from 'react'
import Modal from '../modal/Modal';
import { doc,updateDoc,arrayUnion,getDoc } from "firebase/firestore";
import Game from '../game/Game';

import {auth,db} from '../../api/firebaseConfig'
import { Button, Card } from 'reactstrap';

function AddGameToList(props){
  const [modalState,setModalState]= useState(false);
  const [lists,setLists] = useState([])
  const addGame = async(list)=>{
    const user = auth.currentUser;
    const collectionRef = doc(db, "users/",user.uid);
    await updateDoc(collectionRef, {
      [`listas.${list}`]:arrayUnion(props.idGame)
    });
    alert(`${props.name} añadido a ${list}`);
  }

  const getlists = async ()=>{
    const user = auth.currentUser;
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    setLists(Object.keys(docSnap.data().listas))
  }
  useEffect(()=>{
    getlists();

  },[])
  return (
    <div className='game'>
    <Card  color="primary"
  outline>
      <Game 
      image={props.image}
      name={props.name}
      idGame={props.idGame}
      genres={props.genres}
      platforms={props.platforms}
      />
      <div className='addGame'>
        <Button  onClick={()=> setModalState(!modalState)}>
          Añadir juego
        </Button>
      </div>
    </Card>
      <Modal state={modalState} changeState={setModalState}>
      <Button  onClick={()=> setModalState(!modalState)}>
        {lists.map((item)=>{
            return(
              <div key ={item} onClick={()=>addGame(item)} className="Container">
                <p>
                  {item}
                </p>
              </div>
            )
          })}
        </Button>
      </Modal>
    </div>

  )
}

export default AddGameToList;