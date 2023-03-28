import { doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import React, {  useState } from 'react'

import { Card, CardTitle } from 'reactstrap';
import { db, storage } from '../../api/firebaseConfig';
function User(props){
  const [image,setImage]=useState();

  const getUserImg= async ()=>{
    const docRef = doc(db, "users", props.id);
    const docSnap = await getDoc(docRef);

    const imageRef = ref(storage, "userImages/"+ props.id+"/"+docSnap.data().image);

    getDownloadURL(imageRef).then((url) => {
      setImage(url)
    });
  }
  getUserImg();
  return ( 
    <div>
      <div className='gameContainer'>
      <Card>
        {<img
            className='gameImg'
            src={image}
            alt=''
          />}
          <CardTitle  className='gameName'>
            <p>{props.username}</p>
          </CardTitle>
          <CardTitle  className='gameName'>
            <p>{props.email}</p>
          </CardTitle>
      </Card>
      </div>
    </div>

  )
}

export default User;