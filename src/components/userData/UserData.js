import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react'

import { auth, db } from '../../api/firebaseConfig';

function UserData() {
  const user = auth.currentUser;
  const [username,setUsername] = useState()
  const [userImage,setUserImage] = useState()
  const image="default-avatar-profile.jpg"
  const getUser = async()=>{
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    setUsername(docSnap.data().username)
  }
  getUser();
  return(
    <>
      <div>
      <div className='imgUser'>
          {<img
            src={require(`/src/images/${image}`)}
            alt=''/>}
          </div> 
        <h3>Username: {username}</h3>
        <h3>Correo: {user.email}</h3>
      </div>
    </>
  )
}

export default UserData;