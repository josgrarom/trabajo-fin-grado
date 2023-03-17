import React, {  useEffect, useState } from 'react'
import { doc,updateDoc,arrayUnion,getDoc } from "firebase/firestore";
import Game from '../game/Game';

import {auth,db} from '../../api/firebaseConfig'
import { Alert, Button, Card, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function AddGameToList(props){
  const [modalState,setModalState]= useState(false);
  const [lists,setLists] = useState([])
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const addGame = async(list)=>{
    toggle()
    const user = auth.currentUser;
    const collectionRef = doc(db, "users/",user.uid);
    await updateDoc(collectionRef, {
      [`listas.${list}`]:arrayUnion(props.idGame)
    });
    const message = `${props.name} añadido a ${list}`;
    alert(`${message}`);
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

    <Card  color="primary" outline>
      <Game 
      image={props.image}
      name={props.name}
      idGame={props.idGame}
      genres={props.genres}
      platforms={props.platforms}
      />
      <div className='addGame'>
      <Button  onClick={toggle}>
        Añadir juego
      </Button>
      </div>
    </Card>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Tus listas</ModalHeader>
        <ModalBody>
        <div className='listContainer'>
          {lists.map((item)=>{
              return(
                <div key ={item} onClick={()=>addGame(item)} className="list">
                  <h1>
                    {item}
                  </h1>
                </div>
            )})}
        </div>
        </ModalBody>
      </Modal>
    </div>

  )
}

export default AddGameToList;