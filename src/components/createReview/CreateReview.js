import React, {  useState } from 'react'
import {auth,db} from '../../api/firebaseConfig'
import { addDoc, collection} from "firebase/firestore";

function CreateReview({gameId}){
  const [newReview, setNewReview] = useState("");
  
  const addReview = async()=>{
    const user = auth.currentUser;
    const collectionRef = collection(db, "reviews");
    await addDoc(collectionRef, {
      game:gameId,
      user:user.uid,
      review:newReview
    });
    window.location.reload(false);
  }


  return(
    <div>
    <input
    placeholder="Name..."
    onChange={(event) => {
      setNewReview(event.target.value);
    }}
  />
  <button onClick={addReview}> Create review</button>
  </div>
  )

}

export default CreateReview;