import React, { useState,useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from '../../api/firebaseConfig'
import { useParams } from "react-router-dom";
import CreateReview from "../createReview/CreateReview";
import ShowReviews from "../showReviews/ShowReviews";
import CreateRating from "../createRating/createRating";
function GameDetails(){

  const {id} = useParams()
  const [listOfGames,setListOfGames]=useState([]);
  const getGame= async()=>{
    const aux =[]
    const q = query(collection(db, "games"), where('steam_appid','==',parseInt(id)))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      aux.push(doc)
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
          <div key={item.data().steam_appid} >
            <div>
              <img  src={item.data().header_image} alt=''/>
              <p>Nombre ={item.data().name}</p>
              <p>Id ={item.data().steam_appid}</p>
            </div>
            <div>
              <CreateRating gameId={item.id}/>
            </div>
            <div>
              <CreateReview gameId={item.id}/>
            </div>
            <div>
              <ShowReviews gameId={item.id}/>
            </div>

          </div>
          )
        })}
        </div>
      </div>

    </div>
  );

}
export default GameDetails;