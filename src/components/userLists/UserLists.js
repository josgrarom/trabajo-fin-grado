import React, { useState } from 'react';
import {auth,db} from '../../api/firebaseConfig'
import { getDoc } from "firebase/firestore";
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { doc,updateDoc,deleteField } from "firebase/firestore";
function UserLists(){

  const [lists,setLists] = useState([])
  const [count,setCount]= useState(0)

  const deleteList =  async (list)=>{
    const user = auth.currentUser;
    const collectionRef = doc(db, "users/",user.uid);
    await updateDoc(collectionRef, {
      [`listas.${list}`]:deleteField()
  });
  setCount(count+1)
  }
  const getlists = async ()=>{
    const user = auth.currentUser;
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    setLists(Object.keys(docSnap.data().listas))
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
              <Link to={`/list/${item}`}>
              <p>
                {item}
              </p>
              </Link>
                <button className="button" onClick={()=>deleteList(item)}>
                  Eliminar lista
                </button>
            </div>
            
          )
        })}
      </h1>
    </div>
  )

}
export default UserLists;