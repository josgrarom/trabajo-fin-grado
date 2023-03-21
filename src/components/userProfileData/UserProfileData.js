import React, { useEffect, useState } from 'react'
import { doc,getDoc } from 'firebase/firestore';
import { auth,db } from '../../api/firebaseConfig';

function UserProfileData({id,image}) {
/*   const user = auth.currentUser; */

  const [gamesNumber,setGamesNumber] = useState();
  const [listsNumber,setListsNumber] = useState();
  const [user,setUser]=useState();



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

  const getUser = async()=>{
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    setUser(docSnap.data().username)
  }

  getGames();
  getLists();
  
  useEffect(()=>{
    getUser();

  },[])
  return(
    <div>
      <div className='userData'>
        
        {<img
          src={require(`/src/images/${image}`)}
          alt=''/>}

        <h3>{user}</h3>
        <div className='userDescription'>
          <p>Descripción Descripción Descripción Descripción Descripción
          Descripción Descripción Descripción Descripción Descripción Descripción
          Descripción Descripción Descripción Descripción Descripción Descripción Descripción
          Descripción Descripción
          </p>
        </div>
      <p>Juegos registrados= {gamesNumber}</p>
      <p>Listas creadas = {listsNumber}</p>
      </div>
    </div>
  )
}

export default UserProfileData;