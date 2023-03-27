import React, { useEffect, useState } from 'react'
import { doc,getDoc } from 'firebase/firestore';
import { auth,db, storage } from '../../api/firebaseConfig';
import CreateDescription from '../createDescription/CreateDescription';
import { getDownloadURL, ref } from 'firebase/storage';

function UserProfileData({id,otherUser}) {
/*   const user = auth.currentUser; */

  const [gamesNumber,setGamesNumber] = useState(0);
  const [listsNumber,setListsNumber] = useState(0);
  const [user,setUser]=useState();
  const [favGame,setFavGame]=useState();
  const [image,setImage]=useState();
  const [noFavGame,setNoFavGame]=useState();
  const [description,setDescription]=useState("");
  if(id===undefined) id = auth.currentUser.uid
  const getGames= async ()=>{
    let aux = 0
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    const games = Object.values(docSnap.data().listas)
    games.map((item)=>{
      item.forEach(() => {
        aux+=1
      });
    })
    setGamesNumber(aux)
  }

  const getLists= async ()=>{
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if(docSnap.data().listas!==undefined){
    const lists = Object.keys(docSnap.data().listas)
    setListsNumber(lists.length)}
    setUser(docSnap.data().username)
    setFavGame(docSnap.data().favGame)
    setNoFavGame(docSnap.data().noFavGame)
    setDescription(docSnap.data().description)

    const imageRef = ref(storage, "userImages/"+ id+"/"+docSnap.data().image);

    getDownloadURL(imageRef).then((url) => {
      setImage(url)
    });
  }



  if(listsNumber!==0)  getGames();
  
  useEffect(()=>{
    getLists();

  },[])
  return(
    <div>
      <div className='dataAndStats'>
        <div className='userData'>
          <div className='imgUser'>
          {<img
            src={image}
            alt=''/>}
          </div>  
          <h3>{user}</h3>
          <div className='userDescription'>
            <p>{description}</p>
          </div>
          <CreateDescription otherUser={otherUser} description={description}/>
        </div>
        <div className='userStats'>
          <div className='block1'>
            <p>Juegos registrados : {gamesNumber}</p>
            <p>Listas creadas : {listsNumber}</p>
          </div>
          <div className='block2'>
            <p>Juego favorito : {favGame}</p>
            <p>Juego mas desagradado : {noFavGame}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfileData;