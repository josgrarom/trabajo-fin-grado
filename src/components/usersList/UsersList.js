import React, { useState } from 'react';
import { useEffect } from 'react';
import { orderBy,limit,getDocs,collection,query,doc,updateDoc,arrayUnion, startAfter,where } from 'firebase/firestore';
import { db,auth } from '../../api/firebaseConfig';
import User from '../user/User';
function UsersList({input}){
  const [listOfUsers,setListOfUsers]=useState([]);
  const [lastDoc,setLastDoc]=useState();
  const loadData = async()=>{
    const aux =[]
    if(input===''){
      const q=query(collection(db, "users"), limit(30),orderBy('username','asc'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        aux.push(doc)
      });
      setListOfUsers(aux)
      const lastDo=aux[aux.length -1]
      setLastDoc(lastDo)
    }else{
      const q = query(collection(db, "users"),orderBy('username','asc'),where('username', '>=', input),where('username', '<=', input+ '\uf8ff'),limit(30));
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
      const q=query(collection(db, "users"), limit(30),orderBy('username','asc'),startAfter(lastDoc));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        aux.push(doc)
      });
      setListOfUsers((listOfGamaes) =>[...listOfGamaes,...aux])

      const lastDo=aux[aux.length -1]
      setLastDoc(lastDo)
    }else{
      const q = query(collection(db, "users"),orderBy('username','asc'),where('username', '>=', input),where('username', '<=', input+ '\uf8ff'),limit(30),startAfter(lastDoc));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        aux.push(doc)
      });
      setListOfUsers((listOfGamaes) =>[...listOfGamaes,...aux])

      const lastDo=aux[aux.length -1]
      setLastDoc(lastDo)
    }

  }


  const addUser = async(userId)=>{
    const user = auth.currentUser;
    const collectionRef = doc(db, "users/",user.uid);
    await updateDoc(collectionRef, {
      follows:arrayUnion(userId)
    });

  }
  useEffect(()=>{
    loadData();

  },[input])

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

            <button onClick={()=>addUser(item.id)}>
              Seguir
            </button>
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