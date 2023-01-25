import React, { useEffect,useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import {auth,db} from '../../api/firebaseConfig'
import { useParams } from "react-router-dom";
import GamesList from "../gamesList/GamesList";
import { doc,getDoc } from "firebase/firestore";

function waitTime(ms) { // for adding asyncness to the async function 
	return new Promise(resolve => setTimeout(resolve,ms)); 
} 
function UserGamesInList(){
  const {name} = useParams()
  const aux =[747660,1150690]
  const [q,setq]= useState(null)

  const getList= async()=>{
    const user = auth.currentUser;
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    setq(query(collection(db, "games"), where('steam_appid','in',docSnap.data().listas[name])))
    
  }

  useEffect(()=>{
    getList();
  },[])
  return (
    <div>
      {q? (
        <GamesList q={q} /> 
        ):(<h1></h1>)}
    </div>
  );
}
export default UserGamesInList;