import React, { useState } from 'react'
import {auth,db} from '../../api/firebaseConfig'
import {addDoc,doc, setDoc} from "firebase/firestore";

function AddUserTodb(){
  const [newUserName, setUserNewName] = useState("");
  
  const addUser = async()=>{
    const user = auth.currentUser;
    const collectionRef = doc(db, "users",user.uid);
    await setDoc(collectionRef, {
      username:newUserName,
      email:user.email,
      description:null,
      favGame:null,
      noFavGame:null,
      follows:[],
      image:null,
    });
    window.location.reload(false);
  }
  return(
    <div>
    <input
    placeholder="Name..."
    onChange={(event) => {
      setUserNewName(event.target.value);
    }}
  />
  <button onClick={addUser}> Nuevo nombre</button>
  </div>
  )
}

export default AddUserTodb;