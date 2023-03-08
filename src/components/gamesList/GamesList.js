import './GamesList.css';
import { useEffect, useState } from 'react';
import { collection, query, limit, where,orderBy,getDocs, startAfter } from "firebase/firestore";
import { db} from '../../api/firebaseConfig';
import AddGameToList from '../addGameToList/AddGameToList';
import { Button } from 'reactstrap';
function GamesList({input,userC,userC2}) {
  const [listOfGamaes,setListOfGames]=useState([]);
  const [lastDoc,setLastDoc]=useState();

  const loadData = async()=>{
    const aux =[]
    if(input===''){
      const q=query(collection(db, "games"), limit(30),orderBy(userC,userC2));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        aux.push(doc)
      });
      setListOfGames(aux)
      const lastDo=aux[aux.length -1]
      setLastDoc(lastDo)
    }else{
      const q = query(collection(db, "games"),orderBy('name','asc'),where('name', '>=', input),where('name', '<=', input+ '\uf8ff'),limit(30));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        aux.push(doc)
      });
      setListOfGames(aux)
      const lastDo=aux[aux.length -1]
      setLastDoc(lastDo)
    }
  }
  
  const loadMoreData= async()=>{
    const aux =[]
    if(input===''){
      const q=query(collection(db, "games"),limit(30),orderBy(userC,userC2),startAfter(lastDoc));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        aux.push(doc)
      });
      setListOfGames((listOfGamaes) =>[...listOfGamaes,...aux])

      const lastDo=aux[aux.length -1]
      setLastDoc(lastDo)
    }else{
      const q = query(collection(db, "games"),limit(30),orderBy('name','asc'),where('name', '>=', input),where('name', '<=', input+ '\uf8ff'),startAfter(lastDoc));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        aux.push(doc)
      });
      console.log(aux)
      setListOfGames((listOfGamaes) =>[...listOfGamaes,...aux])

      const lastDo=aux[aux.length -1]
      setLastDoc(lastDo)
    }

  }
  useEffect(()=>{
    loadData();
  },[input,userC,userC2])
  return (
    <div>
        <div>
        {listOfGamaes.map((item)=>{
          return(      
          <div key={item.data().steam_appid} className='gamesContainer'>
            <AddGameToList 
            image={item.data().header_image}
            name={item.data().name}
            idGame={item.data().steam_appid}
            genres={item.data().genres}
            platforms={item.data().platforms}
            />
          </div>
          )
        })
        }
        </div>
        <div className='more'>
          <Button onClick={loadMoreData}>Mas</Button>
        </div>
    </div>
  );
}

export default GamesList;