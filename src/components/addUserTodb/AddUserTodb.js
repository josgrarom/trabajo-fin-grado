import React, { useState } from 'react'
import {auth,db} from '../../api/firebaseConfig'
import {doc, setDoc} from "firebase/firestore";
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';

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
        <Modal isOpen={true} >
        <ModalHeader>Username</ModalHeader>
        <ModalBody>
        <div className='loginContainer'>
          <div className='emailContainer'>
            <input onChange={(event) => {setUserNewName(event.target.value);}}/>
          </div>
            <Button onClick={addUser}>Añadir username</Button>
        </div>
        </ModalBody>
      </Modal>
  </div>
  )
}

export default AddUserTodb;