import React, { useState } from 'react';
import {auth,db} from '../../api/firebaseConfig'
import { arrayRemove, getDoc } from "firebase/firestore";
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { doc,updateDoc,deleteField } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
function UserFollows(){

  const [follows,setFollows] = useState([])
  const [count,setCount]= useState(0)

  const deleteFollow =  async (follow)=>{
    const user = auth.currentUser;
    const collectionRef = doc(db, "users/",user.uid);
    await updateDoc(collectionRef, {
      
      follows:arrayRemove(follow)
  });
  setCount(count+1)
  }
  const getFollows =  ()=>{
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const user = auth.currentUser;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setFollows(docSnap.data().follows)
      } else {

      }
    });

  }

  useEffect(()=>{
    getFollows();
  },[count])
  
  return(
    <div>
      <h1>
        {follows.map((item)=>{
          return(
            
            <div key ={item} className="Container">
              
              <p>
                {item}
              </p>
              
                <button className="button" onClick={()=>deleteFollow(item)}>
                  Dejar de seguir
                </button>
            </div>
            
          )
        })}
      </h1>
    </div>
  )

}
export default UserFollows;