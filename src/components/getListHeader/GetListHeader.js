import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../api/firebaseConfig';

function GetListHeader({list,idUser}){
  const user= idUser
  const [gamesImg,setGamesImg]= useState([])
  const getGames= async(lista)=>{
    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);
    const gamesIds = docSnap.data().listas[lista].slice(0,4)
    const aux =[]
    gamesIds.map(async (item)=>{
      const q = query(collection(db, "games"), where('steam_appid','==',item))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        aux.push(doc.data().header_image)
      });
      setGamesImg(aux)
    })
  }
  useEffect(()=>{
    getGames(list);

  },[])
  
return(
  <>   
  <div className='headerContainer'>
  {gamesImg.map((item)=>{
    return(
    <div className='gameHeader'>
      <img
      className='gameImg2'
      src={item}
      alt=''/>
    </div>)

  })}
  </div>
  </>
)
}
export default GetListHeader;