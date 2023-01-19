import './GamesList.css';
import Logo from '../../constants/Logo.js';
import Game from '../game/Game';
import SignOut from '../signOut/SignOut';
import { db} from '../../api/firebaseConfig';
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';

function GamesList() {
  const [listOfGamaes,setListOfGames]=useState([]);

  const loadData = async()=>{
    const aux =[]
    const q = query(collection(db, "games"), limit(10),orderBy('recommendations','desc'));
  
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

      aux.push(doc.data())
      setListOfGames(aux)
    });
  }

  useEffect(()=>{
    loadData();

  },[])

  return (
    <div>
      <div className='authenticatedHome'> 
        <div className='searchContainer'>
        {listOfGamaes.map((item)=>{
          return(
          <div key={item.steam_appid} className='gamesContainer'>
            <Game 
            image={item.header_image}
            name={item.name}
            
            />
          </div>
          )
        })
        }
        </div>
      </div>
    </div>
  );
}

export default GamesList;