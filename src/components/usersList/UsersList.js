import React, { useState } from 'react';
import { useEffect } from 'react';
import { orderBy,limit,getDocs,collection,query,doc,updateDoc,arrayUnion, startAfter,where,getDoc } from 'firebase/firestore';
import { db,auth } from '../../api/firebaseConfig';
import User from '../user/User';
import { Link } from 'react-router-dom';
import { Button, Card } from 'reactstrap';
function UsersList({input}){
  const [listOfUsers,setListOfUsers]=useState([]);
  const [lastDoc,setLastDoc]=useState();
  const [username,setUsername]=useState();
  const [follows,setFollows] = useState([])
  const [count,setCount]= useState(0)
  const user = auth.currentUser;

  const getUserName = async()=>{
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    setUsername(docSnap.data().username)
  }

  const getfollowList = async()=>{
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    setFollows(docSnap.data().follows)
  }

  const loadData = async()=>{
    const aux =[]
    if(input===''){
      const q=query(collection(db, "users"), limit(30),orderBy('username','asc'),where('username', '!=',username));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        aux.push(doc)
      });
      setListOfUsers(aux)
      const lastDo=aux[aux.length -1]
      setLastDoc(lastDo)
    }else{
      const q = query(collection(db, "users"),orderBy('username','asc'),where('username', '>=', input),where('username', '<=', input+ '\uf8ff'),limit(30),where('username', '!=',username));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        aux.push(doc)
      });
      setListOfUsers(aux)
      const lastDo=aux[aux.length -1]
      setLastDoc(lastDo)
    }
  }
  const loadMoreData= async()=>{
    const aux =[]
    if(input===''){
      const q=query(collection(db, "users"), limit(30),orderBy('username','asc'),startAfter(lastDoc),where('username', '!=',username));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        aux.push(doc)
      });
      setListOfUsers((listOfUsers) =>[...listOfUsers,...aux])

      const lastDo=aux[aux.length -1]
      setLastDoc(lastDo)
    }else{
      const q = query(collection(db, "users"),orderBy('username','asc'),where('username', '>=', input),where('username', '<=', input+ '\uf8ff'),limit(30),startAfter(lastDoc),where('username', '!=',username));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        aux.push(doc)
      });
      setListOfUsers((listOfUsers) =>[...listOfUsers,...aux])

      const lastDo=aux[aux.length -1]
      setLastDoc(lastDo)
    }

  }


  const addUser = async(username)=>{
    const collectionRef = doc(db, "users/",user.uid);
    await updateDoc(collectionRef, {
      follows:arrayUnion(username)
    });
    setCount(count+1)
  }
  
  getUserName();
  useEffect(()=>{
    loadData();
    getfollowList();
  },[input,username,count])
  return (
    <div>
      <div>
        {listOfUsers.map((item)=>{
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
              <Button onClick={()=>addUser(item.id)}>
                Seguir
              </Button>}
            </Card>
          </div>)})}
      </div>
      <div className='more'>
        <Button onClick={loadMoreData}>Mas</Button>
      </div>
    </div>
  );
}
export default UsersList;