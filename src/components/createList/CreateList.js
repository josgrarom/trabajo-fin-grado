import React, { useState } from 'react'
import {auth,db} from '../../api/firebaseConfig'
import { doc,updateDoc} from "firebase/firestore";
import { Button } from 'reactstrap';

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
    <div className='createList'>
      <input
      placeholder="Nombre"
      onChange={(event) => {
        setNewName(event.target.value);
      }}/>
    <div className='buttonCreateList'>
      <Button onClick={addList}> Crear lista</Button>
    </div>
  </div>
  )
}

export default CreateList;