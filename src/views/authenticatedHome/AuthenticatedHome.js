import './AuthenticatedHome.css';
import Logo from '../../constants/Logo.js';
import Game from '../../components/game/Game';
import SignOut from '../../components/signOut/SignOut';
import { db} from '../../api/firebaseConfig';
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react';

function AuthenticatedHome() {
  const [listOfGamaes,setListOfGames]=useState([]);

  const loadData = async()=>{
    const aux =[]
    const q = query(collection(db, "games"), limit(10),orderBy('recommendations','desc'));
  
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      aux.push(doc.data())
      setListOfGames(aux)
    });
  }

  useEffect(()=>{
    loadData();

  },[])

  return (
    <div>
      <Logo/>
      <div className='authenticatedHome'> 
        <div className='searchContainer'>
        {listOfGamaes.map((item)=>{
          return(
          <div key={item.appid} className='gamesContainer'>
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
      <SignOut/>
    </div>
  );
}

export default AuthenticatedHome;