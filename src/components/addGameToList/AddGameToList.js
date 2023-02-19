import React, {  useState } from 'react'
import Modal from '../modal/Modal';
import { doc,updateDoc,arrayUnion,getDoc } from "firebase/firestore";
import Game from '../game/Game';
import { Link } from 'react-router-dom';
import {auth,db} from '../../api/firebaseConfig'

function AddGameToList(props){
  const [modalState,setModalState]= useState(false);
  const [lists,setLists] = useState([])
  const addGame = async(list)=>{
    const user = auth.currentUser;
    const collectionRef = doc(db, "users/",user.uid);
    await updateDoc(collectionRef, {
      [`listas.${list}`]:arrayUnion(props.idGame),
      games:arrayUnion(props.idGame)
    });
    alert(`${props.name} añadido a ${list}`);
  }

  const getlists = async ()=>{
    const user = auth.currentUser;
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    setLists(Object.keys(docSnap.data().listas))
  }
  getlists();
  return (
    <div>
      <Link to={`/game/${props.idGame}`}>
      <Game 
      image={props.image}
      name={props.name}
      idGame={props.steam_appid}
      />
      </Link>
      <button className="button" onClick={()=> setModalState(!modalState)}>
        Añadir juego
      </button>


      <Modal state={modalState} changeState={setModalState}>
      <button className="button" onClick={()=> setModalState(!modalState)}>
        {lists.map((item)=>{
            return(
              <div key ={item} onClick={()=>addGame(item)} className="Container">
                <p>
                  {item}
                </p>
              </div>
            )
          })}
        </button>
      </Modal>
    </div>

  )
}

export default AddGameToList;