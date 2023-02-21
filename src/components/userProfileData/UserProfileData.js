import React, { useState } from 'react'
import { doc,getDoc } from 'firebase/firestore';
import { auth,db } from '../../api/firebaseConfig';

function UserProfileData() {
  const user = auth.currentUser;
  const [gamesNumber,setGamesNumber] = useState();
  const [listsNumber,setListsNumber] = useState();

  const getGames= async ()=>{
    let aux = 0
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const games = Object.values(docSnap.data().listas)
    games.map((item)=>{
      item.forEach(() => {
        aux+=1
      });
    })
    setGamesNumber(aux)
  }

  const getLists= async ()=>{
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const lists = Object.keys(docSnap.data().listas)
    setListsNumber(lists.length)
  }

  getGames();
  getLists();
  return(
    <div>
      <p>Juegos registrados= {gamesNumber}</p>
      <p>Listas creadas = {listsNumber}</p>
    </div>
  )
}

export default UserProfileData;