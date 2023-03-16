import React, {  useState } from 'react'
import {auth,db} from '../../api/firebaseConfig'
import { addDoc, collection,where,getDocs,query,updateDoc,doc} from "firebase/firestore";
import { Input } from 'reactstrap';

function CreateReview({gameId,gameN}){
  const [newReview, setNewReview] = useState("");
  
  const updateReview= async(reviw)=>{
    const q = query(collection(db, "reviews"), where('game','==',gameId),where('user','==',auth.currentUser.uid))
    const querySnapshot = await getDocs(q);

    if(querySnapshot.empty){
      const user = auth.currentUser;
      const collectionRef = collection(db, "reviews");
      await addDoc(collectionRef, {
        game:gameId,
        gameName:gameN,
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
    <Input
    type="textarea"
    placeholder="Tu opinión"
    onChange={(event) => {
      setNewReview(event.target.value);
    }}/>
    <button onClick={()=>updateReview(newReview)}> Create review</button>
  </div>
  )

}

export default CreateReview;