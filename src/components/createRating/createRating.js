import React, {  useState } from 'react'
import {auth,db} from '../../api/firebaseConfig'
import { addDoc, collection,where,getDocs,query,updateDoc,doc} from "firebase/firestore";
import Rate from '../rate/rate';
function CreateRating({gameId}){
  const [rating, setRating] = useState(0);
  
  const updateRating = async(rate)=>{
    const q = query(collection(db, "ratings"), where('game','==',gameId),where('user','==',auth.currentUser.uid))
    const querySnapshot = await getDocs(q);

    if(querySnapshot.empty){
      console.log('creando')
      const user = auth.currentUser;
      const collectionRef = collection(db, "ratings");
      await addDoc(collectionRef, {
        game:gameId,
        user:user.uid,
        rating:rate
      });
      setRating(rate)
    }else{
      console.log('actualizando')
      querySnapshot.forEach(async(docu) => {
        const collectionRef = doc(db, "ratings/",docu.id);
        await updateDoc(collectionRef, {
          rating:rate
        });
        setRating(rate)
      });
  }


  }


  return(
    <div>
      <p>Rating game</p>
      <Rate rating={rating} onRating={(rate) =>updateRating(rate)} />
      <p>Rating - {rating}</p>
  </div>
  )

}

export default CreateRating;