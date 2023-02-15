import React, {  useState } from 'react'
import {auth,db} from '../../api/firebaseConfig'
import { addDoc, collection,where,getDocs,query,updateDoc,doc} from "firebase/firestore";

function CreateReview({gameId}){
  const [newReview, setNewReview] = useState("");
  
  const updateReview= async(reviw)=>{
    const q = query(collection(db, "reviews"), where('game','==',gameId),where('user','==',auth.currentUser.uid))
    const querySnapshot = await getDocs(q);

    if(querySnapshot.empty){
      const user = auth.currentUser;
      const collectionRef = collection(db, "reviews");
      await addDoc(collectionRef, {
        game:gameId,
        user:user.uid,
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

  return(
    <div>
    <input
    placeholder="Name..."
    onChange={(event) => {
      setNewReview(event.target.value);
    }}
  />
  <button onClick={()=>updateReview(newReview)}> Create review</button>
  </div>
  )

}

export default CreateReview;