import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import { Input } from 'reactstrap';
import { auth, db, storage } from '../../api/firebaseConfig';
import ChangePassword from '../changePassword/ChangePassword';
import ChangeUsername from '../changeUsername/ChangeUsername';
import DeleteUser from '../deleteUser/DeleteUser';

function UserData() {
  const user = auth.currentUser;
  const [username,setUsername] = useState()
  const [userImage,setUserImage] = useState()
  const getUser = async()=>{
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    const imageRef = ref(storage, "userImages/"+ auth.currentUser.uid+"/"+docSnap.data().image);
    getDownloadURL(imageRef).then((url) => {
      setUserImage(url)
    });
    setUsername(docSnap.data().username)
  }

  getUser();

  const handleFileInputChange = async(event) => {
    const file = event.target.files[0];
    const collectionRef = doc(db, "users/",auth.currentUser.uid);
    await updateDoc(collectionRef, {
      image:file.name
    });
    
    const storageRef = ref(storage, "userImages/"+ auth.currentUser.uid+"/" + file.name);
    const uploadTask = uploadBytes(storageRef, file);
  
    uploadTask.then(() => {
      window.location.reload(false);
    }).catch((error) => {
      console.error("Error al subir la imagen: ", error);
    });
  }

  return(
    <>
      <div className='userPersonalData'>
        <div className='imgUserPersonalData'>
          {<img src={userImage} />}
        </div> 
          <div className='changeImage'>
            <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFileInputChange}/>
          </div>

          <div className='userName'>
            <h3>Username: {username}</h3>
            <ChangeUsername/>
          </div>
          <div className='userEmail'>
            <h3>Correo: {user.email}</h3>
          </div>
          <div className='userButtons'>
            <div className='buttonChange'>
              <ChangePassword/>
            </div>
            <DeleteUser/>
          </div>
      </div>
    </>
  )
}

export default UserData;