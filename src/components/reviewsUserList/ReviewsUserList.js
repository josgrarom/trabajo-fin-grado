import React, { useEffect,useState } from "react";
import { collection, query, where, getDocs,getDoc } from "firebase/firestore";
import {auth,db} from '../../api/firebaseConfig'
import { doc,deleteDoc } from "firebase/firestore";
function ReviewsUserList(){
  const [listOfReviews,setListOfReviews]=useState([]);
  const [count,setCount]= useState(0)
  const currentUser= auth.currentUser.uid
  const deleteReview = async (idReview)=>{

    const collectionRef = doc(db, "reviews/",idReview);
    await deleteDoc(collectionRef)
    setCount(count+1)
  }

  const getList= async()=>{
      const aux=[]
      const q = query(collection(db, "reviews"), where('user','==',currentUser))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        aux.push(doc)
      });
      setListOfReviews(aux)
    };
  


  useEffect(()=>{
    getList();

  },[count])
  return (
    <div>
      
      <div className='authenticatedHome'> 
        <div className='searchContainer'>
          {
        listOfReviews.map((item)=>{
          return(
            <div key={item.id}>
            <p>usuaro={item.data().user}</p>
            <p>review={item.data().review}</p>
            <p>juego={item.data().gameName}</p>
            {item.data().user===auth.currentUser.uid&&
            <button className="button" onClick={()=>deleteReview(item.id)}>
              Eliminar review
            </button>}
          </div>
          )
        })}
        </div>
      </div>
      
    </div>
  );
}
export default ReviewsUserList;