import { collection,deleteDoc,query,where,doc } from 'firebase/firestore';
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { db } from '../../api/firebaseConfig';
import { auth } from '../../api/firebaseConfig';
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
        {listOfReviews.map((item)=>{
          return(
          <div key={item.id}>
          <h5 style={{paddingtop:'10px'}}>{item.data().username}</h5>
          <div className='reviewText'>
              <p>{item.data().review}</p>
          </div>
          {item.data().user===auth.currentUser.uid&&
            <Button onClick={()=>deleteReview(item.id)}>
              Eliminar
            </Button>}
          </div>
          )
        })
        }
    </div>
  );
}

export default ShowReviews;