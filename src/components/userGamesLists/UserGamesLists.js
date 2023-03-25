import React, { useState } from 'react';
import {auth,db} from '../../api/firebaseConfig'
import { getDoc } from "firebase/firestore";
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { doc,updateDoc,deleteField } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import GetListHeader from '../getListHeader/GetListHeader';
function UserGamesLists({otherUser,id}){
  const [lists,setLists] = useState([])
  const [count,setCount]= useState(0)

  const deleteList =  async (list)=>{

    const collectionRef = doc(db, "users/",id);
    await updateDoc(collectionRef, {
      [`listas.${list}`]:deleteField()
  });
  setCount(count+1)
  }
  const getlists =  ()=>{
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const user = auth.currentUser;
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        setLists(Object.keys(docSnap.data().listas))
      } else {

      }
    });

  }

  useEffect(()=>{
    getlists();
  },[count])

  return(
    <div className='userLists'>
        {lists.sort().reverse().map((item)=>{
          return(
            
            <div key ={item}  className="userlistsContainer">
              <div className="headerAndName">
              <Link to={`/list/${item}/${id}`}>
                <GetListHeader idUser={id}list={item}/>
                <h1>{item}</h1>
              </Link>
              </div>
              <div>
              {!otherUser&&
                <Button className="buttonList" onClick={()=>deleteList(item)}>
                  Eliminar lista
                </Button>}
                </div>
            </div>
            
          )
        })}
    </div>
  )

}
export default UserGamesLists;