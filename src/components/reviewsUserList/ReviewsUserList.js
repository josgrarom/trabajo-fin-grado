import React, { useEffect,useState } from "react";
import { collection, query, where, getDocs,getDoc } from "firebase/firestore";
import {auth,db} from '../../api/firebaseConfig'
import { doc,deleteDoc } from "firebase/firestore";
import { Button } from "reactstrap";
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
      
          {
        listOfReviews.map((item)=>{
          return(
            <div key={item.id} className="reviewUserContainer">
              <div className="reviewIMGandName">
                <img  src={item.data().gameImage} alt=''/>
                <h3>{item.data().gameName}</h3>
              </div>
              <div className='reviewUserDesc'>
                <p>{item.data().review}</p>

              </div>
              {item.data().user===auth.currentUser.uid&&
                <Button className="button" onClick={()=>deleteReview(item.id)}>
                  Eliminar review
                </Button>}
          </div>
          )
        })}
      
    </div>
  );
}
export default ReviewsUserList;