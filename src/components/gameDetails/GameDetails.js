import React, { useState,useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from '../../api/firebaseConfig'
import { useParams } from "react-router-dom";
function GameDetails(){

  const {id} = useParams()
  const [listOfGames,setListOfGames]=useState([]);
  const getGame= async()=>{
    const aux =[]
    const q = query(collection(db, "games"), where('steam_appid','==',parseInt(id)))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      aux.push(doc.data())
      setListOfGames(aux)
    });
  }

  useEffect(()=>{
    getGame();

  },[])
  return (
    <div>
      
      <div className='authenticatedHome'> 
        <div className='searchContainer'>
          {
        listOfGames.map((item)=>{
          return(
          <div key={item.steam_appid} >
            
            <img  src={item.header_image} alt=''/>
            <p>Nombre ={item.name}</p>
            <p>Id ={item.steam_appid}</p>
      
          </div>
          )
        })}
        </div>
      </div>
      
    </div>
  );

}
export default GameDetails;