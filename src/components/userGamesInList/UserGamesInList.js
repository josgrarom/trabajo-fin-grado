import React, { useEffect,useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import {auth,db} from '../../api/firebaseConfig'
import { useParams } from "react-router-dom";
import { doc,getDoc,updateDoc,arrayRemove } from "firebase/firestore";
import Game from "../game/Game";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "reactstrap";
function UserGamesInList(){
  const {name} = useParams()
  const {user} = useParams()
  const [listOfGames,setListOfGames]=useState([]);
  const [count,setCount]= useState(0)
  const currentUser= auth.currentUser.uid
  const deleteGame = async (idGame)=>{


    const collectionRef = doc(db, "users/",user)
    await updateDoc(collectionRef, {
      [`listas.${name}`]:arrayRemove(idGame),
      games:arrayRemove(idGame)
    });
    if(listOfGames.length===1) window.location.reload(false);
    setCount(count+1)
  }

  const getList= async()=>{
    onAuthStateChanged(auth, async () => {
    
        const aux =[]
 
        const docRef = doc(db, "users", user);
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

    });
  }

  useEffect(()=>{
    getList();

  },[count])
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
            genres={item.genres}
            platforms={item.platforms}
            />
            {currentUser===user&&
            <Button className="button" onClick={()=>deleteGame(item.steam_appid)}>
              Eliminar Juego
            </Button>}
      
          </div>
          )
        })}
        </div>
      </div>
      
    </div>
  );
}
export default UserGamesInList;