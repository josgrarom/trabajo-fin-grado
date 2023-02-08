import React, { useState } from 'react'
import {auth,db} from '../../api/firebaseConfig'
import { doc,updateDoc} from "firebase/firestore";

function CreateList(){
  const [newName, setNewName] = useState("");
  
  const addList = async()=>{
    const user = auth.currentUser;
    const collectionRef = doc(db, "users/",user.uid);
    await updateDoc(collectionRef, {
      [`listas.${newName}`]:[]
    });
    window.location.reload(false);
  }
  return(
    <div>
    <input
    placeholder="Name..."
    onChange={(event) => {
      setNewName(event.target.value);
    }}
  />
  <button onClick={addList}> Create List</button>
  </div>
  )
}

export default CreateList;