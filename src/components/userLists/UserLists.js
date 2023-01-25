import React, { useState } from 'react';
import {auth,db} from '../../api/firebaseConfig'
import { doc,getDoc } from "firebase/firestore";
import { useEffect } from 'react';
import { Link } from "react-router-dom";
function UserLists(){

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
        {lists.map((item)=>{
          return(
            
            <div key ={item} className="Container">
              <Link to={`/list/${item}`}>
              <p>
                {item}
              </p>
              </Link>
            </div>
            
          )
        })}
      </h1>
    </div>
  )

}
export default UserLists;