import React, {  useEffect, useState } from 'react'
import {auth,db} from '../../api/firebaseConfig'
import { addDoc, collection,where,getDocs,query,updateDoc,doc, getDoc} from "firebase/firestore";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function CreateDescription({description,otherUser}){
  const [newDescription, setNewDescription] = useState("");
  const [modal, setModal] = useState(false);

  const user = auth.currentUser;
  const toggle = () => {setModal(!modal);
    setNewDescription("");
  }

  const setDescription = async()=>{
    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, {
      description:newDescription,
    });
    window.location.reload(false);
  }
  return(
    <div className='descriptionButton'>
      {!otherUser&&
      <Button  onClick={toggle}>
        Cambiar
      </Button>}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Descripción</ModalHeader>
        <ModalBody style={{height:'150px'}}>
            <Input type="textarea" style={{height:'115px'}} placeholder={description}
            onChange={(event) => { setNewDescription(event.target.value)}}/>
        </ModalBody>
        <ModalFooter>
          <Button  disabled={newDescription.trim().length <= 0} onClick={()=>setDescription(newDescription)}>
          Confirmar 
          </Button>
        </ModalFooter>
      </Modal>
  </div>
  )

}

export default CreateDescription;