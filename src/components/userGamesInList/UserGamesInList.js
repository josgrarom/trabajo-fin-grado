import React, { useEffect,useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import {auth,db} from '../../api/firebaseConfig'
import { useParams } from "react-router-dom";
import { doc,getDoc } from "firebase/firestore";
import Game from "../game/Game";
function UserGamesInList(){
  const {name} = useParams()
  const [listOfGames,setListOfGames]=useState([]);

  const getList= async()=>{
    const aux =[]
    const user = auth.currentUser;
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const gamesIds = docSnap.data().listas[name]

    for (let i = 0; i < gamesIds.length; i += 10) {
      let pedazo = gamesIds.slice(i, i + 10);
      aux.push(pedazo);
    }

    const aux2 =[]
    aux.map(async (item)=>{
      const q = query(collection(db, "games"), where('steam_appid','in',item))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        aux2.push(doc.data())
        setListOfGames(aux2)
      });
    })
    
  }
  useEffect(()=>{
    getList();
  },[])
  return (
    <div>
      
      <div className='authenticatedHome'> 
        <div className='searchContainer'>
          {
        listOfGames.map((item)=>{
          return(
          <div key={item.steam_appid} className='gamesContainer'>
            <Game 
            image={item.header_image}
            name={item.name}
            idGame={item.steam_appid}
            />
          </div>
          )
        })}
        </div>
      </div>
      
    </div>
  );
}
export default UserGamesInList;