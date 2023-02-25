import React, { useState } from 'react';
import {auth,db} from '../../api/firebaseConfig'
import { getDoc } from "firebase/firestore";
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { doc,updateDoc,deleteField } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
function UserGamesLists({otherUser,id}){
  const [lists,setLists] = useState([])
  const [count,setCount]= useState(0)

  const deleteList =  async (list)=>{

    const collectionRef = doc(db, "users/",id);
    await updateDoc(collectionRef, {
      [`listas.${list}`]:deleteField()
  });
  setCount(count+1)
  }
  const getlists =  ()=>{
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const user = auth.currentUser;
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        setLists(Object.keys(docSnap.data().listas))
      } else {

      }
    });

  }

  useEffect(()=>{
    getlists();
  },[count])

  
  return(
    <div>
      <h1>
        {lists.map((item)=>{
          return(
            
            <div key ={item} className="Container">
              <Link to={`/list/${item}/${id}`}>
              <p>
                {item}
              </p>
              </Link>
              {!otherUser&&
                <button className="button" onClick={()=>deleteList(item)}>
                  Eliminar lista
                </button>}
            </div>
            
          )
        })}
      </h1>
    </div>
  )

}
export default UserGamesLists;