import React, { useState } from 'react'
import {auth,db} from '../../api/firebaseConfig'
import { doc,getDoc} from "firebase/firestore";
import { useEffect } from 'react';



function UserProfile() {
  const user = auth.currentUser;
  const [lists,setLists] = useState([])

  useEffect(()=>{

    const getlists = async ()=>{
      const user = auth.currentUser;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      setLists(Object.keys(docSnap.data().listas))
    }

    getlists();
  },[])
  
  return(
    <div>
      <h1>
        Perfil de {user.email}
      </h1>
      <h1>
        Listas {lists.map((item)=>{
          return(
            <p key ={item}>{item}</p>
          )
        })}
      </h1>
    </div>
  )
}

export default UserProfile;