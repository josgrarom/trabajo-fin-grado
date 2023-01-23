import React, { useState } from 'react'
import {auth,db} from '../../api/firebaseConfig'
import { doc,updateDoc,arrayUnion,getDoc } from "firebase/firestore";
import { useEffect } from 'react';
import "./showLists.css"

function ShowLists(props) {
  const [lists,setLists] = useState([])
  const addGame = async(list)=>{
    const user = auth.currentUser;
    const collectionRef = doc(db, "users/",user.uid);
    await updateDoc(collectionRef, {
      [`listas.${list}`]:arrayUnion(props.idGame)
    });
    console.log('juego añadido')
  }
  useEffect(()=>{

    const getlists = async ()=>{
      const user = auth.currentUser;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      setLists(Object.keys(docSnap.data().listas))
    }

    getlists();
  },[])

  
  return(
    <div>
      <h1>
        {lists.map((item)=>{
          return(
            <div key ={item} onClick={()=>addGame(item)} className="Container">
              <p>
                {item}
              </p>
            </div>
          )
        })}
      </h1>
    </div>
  )
}
export default ShowLists;