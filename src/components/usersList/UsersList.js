import React, { useState } from 'react';
import { useEffect } from 'react';
import { orderBy,limit,getDocs,collection,query,doc,updateDoc,arrayUnion } from 'firebase/firestore';
import { db,auth } from '../../api/firebaseConfig';
import User from '../user/User';
function UsersList(){
  const [listOfUsers,setListOfUsers]=useState([]);
  const q=query(collection(db, "users"), limit(30),orderBy('email','asc'));
  const loadData = async()=>{
    const aux =[]
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      aux.push(doc)
      setListOfUsers(aux)
    });
  }
  const addUser = async(userId)=>{
    const user = auth.currentUser;
    const collectionRef = doc(db, "users/",user.uid);
    await updateDoc(collectionRef, {
      follows:arrayUnion(userId)
    });

  }
  useEffect(()=>{
    loadData();

  },[])

  return (
    <div>
      <div > 
        <div >
        {listOfUsers.map((item)=>{
          return(
            
          <div key={item.id} >
            <User 
            id={item.id}
            email={item.data().email}
            username={item.data().username}
            />
            <br></br>

            <button onClick={()=>addUser(item.id)}>
              Seguir
            </button>
          </div>
          )
        })
        }
        </div>
      </div>
    </div>
  );
}
export default UsersList;