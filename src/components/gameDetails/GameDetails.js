import React, { useState,useEffect } from "react";
import { collection, query, where, getDocs,doc,getDoc } from "firebase/firestore";
import {db} from '../../api/firebaseConfig'
import { useParams } from "react-router-dom";
import CreateReview from "../createReview/CreateReview";
import ShowReviews from "../showReviews/ShowReviews";
import CreateRating from "../createRating/createRating";
import parse from 'html-react-parser';

function GameDetails(){

  const [averageRating,setAverageRating]=useState()
  const [listOfRatings,setListOfRatings]=useState([])
  const [gameId,setGameId]=useState('3aImPGxkinxcKiEgtJ1a')
  const {id} = useParams()
  const [listOfGames,setListOfGames]=useState([]);

  const getGame= async()=>{
    const aux =[]
    const q = query(collection(db, "games"), where('steam_appid','==',parseInt(id)))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      aux.push(doc)
      setGameId(doc.id)

    });
    setListOfGames(aux)
  }

  const getAverageListRating=async()=>{
    const q = query(collection(db, "ratings"), where('game','==',gameId))
    const querySnapshot = await getDocs(q);
    const aux=[]
    let sum=0
    if(!querySnapshot.empty){
      querySnapshot.forEach(async(docu) => {
        const collectionRef = doc(db, "ratings/",docu.id);
        const docSnap = await getDoc(collectionRef)
        aux.push(docSnap.data().rating)
      });
      setListOfRatings(aux)
      for(let i of listOfRatings) sum+=i;
  }
    setAverageRating(sum/listOfRatings.length)
  }

  useEffect(()=>{
    getGame();
    getAverageListRating();
  },[averageRating])

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
              <p>puntuación media={averageRating}</p>
            </div>
            <div>
              <CreateRating gameId={item.id}/>
              <br></br>
            </div>
            {parse(item.data().about_the_game)}
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