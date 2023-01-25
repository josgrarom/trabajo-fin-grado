import './GamesList.css';
import Game from '../game/Game';
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';

function GamesList({q}) {
  const [listOfGamaes,setListOfGames]=useState([]);

  const loadData = async()=>{
    const aux =[]
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
            idGame={item.steam_appid}
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