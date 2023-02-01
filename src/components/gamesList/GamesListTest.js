import './GamesList.css';
import Game from '../game/Game';
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, startAt,endAt} from "firebase/firestore";
import { db} from '../../api/firebaseConfig';
function GamesList({input}) {
  const [listOfGamaes,setListOfGames]=useState([]);
  const q = query(collection(db, "games"),orderBy('name','asc'),startAt(input),endAt(input +"\uf8ff"),limit(30));
  const q2 = query(collection(db, "games"),orderBy('name','asc'),startAt(input.toLowerCase()),endAt(input.toLowerCase() +"\uf8ff"),limit(30));
  const loadData = async()=>{
    const aux =[]
    const querySnapshot = await getDocs(q);
    const querySnapshot2 = await getDocs(q2);
    querySnapshot.forEach((doc) => {
      aux.push(doc.data())
    });
    querySnapshot2.forEach((doc) => {
      aux.push(doc.data())
    });
    setListOfGames(aux)
  }

  useEffect(()=>{
    loadData();

  },[input])
  return (
    <div>
      <div className='authenticatedHome'> 
        <div className='searchContainer'>
          <h1>{input}</h1>
        {listOfGamaes.map((item)=>{
          return(
          <div key={item.steam_appid} className='gamesContainer'>
            <Game 
            image={item.header_image}
            name={item.name}
            idGame={item.steam_appid}
            addButton={true}
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