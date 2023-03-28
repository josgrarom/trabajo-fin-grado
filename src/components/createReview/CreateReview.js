import React, {  useEffect, useState } from 'react'
import {auth,db} from '../../api/firebaseConfig'
import { addDoc, collection,where,getDocs,query,updateDoc,doc, getDoc} from "firebase/firestore";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function CreateReview({gameId,gameN,gameIm}){
  const [newReview, setNewReview] = useState("");
  const [username,setUsername]=useState();
  const [modal, setModal] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const user = auth.currentUser;
  const toggle = () => {setModal(!modal);
    setNewReview("");
  }

  const getUserName = async()=>{
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    setUsername(docSnap.data().username)
  }


  const updateReview= async(reviw)=>{
    const q = query(collection(db, "reviews"), where('game','==',gameId),where('user','==',auth.currentUser.uid))
    const querySnapshot = await getDocs(q);
    if(querySnapshot.empty){

      const collectionRef = collection(db, "reviews");
      await addDoc(collectionRef, {
        game:gameId,
        gameName:gameN,
        gameImage:gameIm,
        user:user.uid,
        username:username,
        review:reviw
      });
      setNewReview(reviw)
      window.location.reload(false);
    }else{
      querySnapshot.forEach(async(docu) => {
        const collectionRef = doc(db, "reviews/",docu.id);
        await updateDoc(collectionRef, {
          review:reviw
        });
        setNewReview(reviw)
        window.location.reload(false);
      });
  }}

  getUserName();
  return(
    <div>
      <Button  onClick={toggle}>
        Crear review
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Cuentanos tu opinión</ModalHeader>
        <ModalBody style={{height:'150px'}}>
            <Input type="textarea" style={{height:'115px'}} placeholder="Tu opinión" 
            onChange={(event) => { setNewReview(event.target.value)}}/>
        </ModalBody>
        <ModalFooter>
          <Button  disabled={newReview.trim().length <= 0} onClick={()=>updateReview(newReview)}>
          Confirmar 
          </Button>
        </ModalFooter>
      </Modal>
  </div>
  )

}

export default CreateReview;