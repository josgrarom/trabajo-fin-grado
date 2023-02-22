import React, { useState } from 'react';
import { useEffect } from 'react';
import { orderBy,limit,getDocs,collection,query,doc,updateDoc,arrayUnion, startAfter,where,getDoc } from 'firebase/firestore';
import { db,auth } from '../../api/firebaseConfig';
import User from '../user/User';
function UsersList({input}){
  const [listOfUsers,setListOfUsers]=useState([]);
  const [lastDoc,setLastDoc]=useState();
  const [username,setUsername]=useState();
  const [follows,setFollows] = useState([])
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
      const q = query(collection(db, "users"),orderBy('username','asc'),where('username', '>=', input),where('username', '<=', input+ '\uf8ff'),limit(30),where('username', '!=',username),where('username', 'not in ',follows));
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
      const q=query(collection(db, "users"), limit(30),orderBy('username','asc'),startAfter(lastDoc),where('username', '!=',username),where('username', 'not in ',follows));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        aux.push(doc)
      });
      setListOfUsers((listOfUsers) =>[...listOfUsers,...aux])

      const lastDo=aux[aux.length -1]
      setLastDoc(lastDo)
    }else{
      const q = query(collection(db, "users"),orderBy('username','asc'),where('username', '>=', input),where('username', '<=', input+ '\uf8ff'),limit(30),startAfter(lastDoc),where('username', '!=',username),where('username', 'not in ',follows));
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

  }
  getUserName();
  useEffect(()=>{
    loadData();
    getfollowList();
  },[input,username,follows])
  return (
    <div>
      <div > 
        <div >
        {listOfUsers.map((item)=>{
          return(
            
          <div key={item.id} >
            <User 
            id={item.id}
            email={item.data().email}
            username={item.data().username}
            />
            <br></br>
            {!follows.includes(item.data().username)&&
            <button onClick={()=>addUser(item.data().username)}>
              Seguir
            </button>
        }
          </div>
          )
        })
        }
        </div>
        <button onClick={loadMoreData}>Mas</button>
      </div>
    </div>
  );
}
export default UsersList;