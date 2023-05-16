import React, { useState } from 'react';
import {auth,db} from '../../api/firebaseConfig'
import { arrayRemove, getDoc } from "firebase/firestore";
import { useEffect } from 'react';
import { doc,updateDoc } from "firebase/firestore";
import { Button, Card } from 'reactstrap';
import User from '../user/User';
import { Link } from 'react-router-dom';
function UserFollows(){

  const [follows,setFollows] = useState([])
  const [count,setCount]= useState(0)
  
  const deleteFollow =  async (follow)=>{
    if(follows.length===1) window.location.reload(false);
    const user = auth.currentUser;
    const collectionRef = doc(db, "users/",user.uid);
    await updateDoc(collectionRef, {
      
      follows:arrayRemove(follow)
  });
  setCount(count+1)
  }

  const getFollows =  async()=>{

        const user = auth.currentUser;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const aux =[]
        docSnap.data().follows.forEach(async(u) => {
          const docRef = doc(db, "users", u);
          const docSnap = await getDoc(docRef);
          if(docSnap.data().username!==undefined){
          aux.push(docSnap)
          setFollows(aux)}
        });


  }
 
  useEffect(()=>{
    getFollows();
  },[count,follows.length])
  return(
    <div>
        {follows.map((item)=>{

          return(
          <div key={item.id}  className='gamesContainer' >
          <Card  color="primary" outline>
            <Link to={`/user/${item.id}`}>
              <User
              id={item.id}
              username={item.data().username}
              email={item.data().email}/>
            </Link>
            {!follows.includes(item.id)&&
            <Button onClick={()=>deleteFollow(item.id)}>
              Dejar de seguir
            </Button>}
          </Card>
        </div>)})}
    </div>
  )

}
export default UserFollows;