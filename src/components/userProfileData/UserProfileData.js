import React, { useEffect, useState } from 'react'
import { doc,getDoc } from 'firebase/firestore';
import { auth,db } from '../../api/firebaseConfig';

function UserProfileData({id}) {
/*   const user = auth.currentUser; */

  const [gamesNumber,setGamesNumber] = useState();
  const [listsNumber,setListsNumber] = useState();
  if(id===undefined) id = auth.currentUser.uid
  const getGames= async ()=>{
    let aux = 0
    const docRef = doc(db, "users", id);
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
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    const lists = Object.keys(docSnap.data().listas)
    setListsNumber(lists.length)
  }
  getGames();
  getLists();
  useEffect(()=>{


  },[])
  return(
    <div>
      <p>Juegos registrados= {gamesNumber}</p>
      <p>Listas creadas = {listsNumber}</p>
    </div>
  )
}

export default UserProfileData;