import { collection,deleteDoc,query,where,doc } from 'firebase/firestore';
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { db } from '../../api/firebaseConfig';
function ShowReviews({gameId}) {
  const [listOfReviews,setListOfReviews]=useState([]);
  const [count,setCount]= useState(0)
  const loadData = async()=>{
    const aux =[]
    const q = query(collection(db, "reviews"), where('game','==',gameId))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      aux.push(doc)
      setListOfReviews(aux)
    });
  }
  const deleteReview = async (idReview)=>{

    const collectionRef = doc(db, "reviews/",idReview);
    await deleteDoc(collectionRef)
    setCount(count+1)
  }
  useEffect(()=>{
    loadData();

  },[count])
  return (
    <div>
      <div className='authenticatedHome'> 

        {listOfReviews.map((item)=>{
          return(
          <div key={item.id}>
            <p>usuaro={item.data().user}</p>
            <p>review={item.data().review}</p>
            <button className="button" onClick={()=>deleteReview(item.id)}>
              Eliminar review
            </button>
          </div>
          
          )
        })
        }
     
      </div>
    </div>
  );
}

export default ShowReviews;