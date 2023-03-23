import React, { useState,useEffect } from "react";
import { collection, query, where, getDocs,doc,getDoc, setDoc, updateDoc } from "firebase/firestore";
import {auth, db} from '../../api/firebaseConfig'
import { useParams } from "react-router-dom";
import CreateReview from "../createReview/CreateReview";
import ShowReviews from "../showReviews/ShowReviews";
import CreateRating from "../createRating/createRating";
import parse from 'html-react-parser';
import { Button, Card, CardHeader, CardTitle, ListGroup, ListGroupItem } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
function GameDetails(){

  const [averageRating,setAverageRating]=useState()
  const [listOfRatings,setListOfRatings]=useState([])
  const [gameId,setGameId]=useState('3aImPGxkinxcKiEgtJ1a')
  const {id} = useParams()
  const [listOfGames,setListOfGames]=useState([]);
  const [gameName,setGameName]=useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isdisLiked, setIsDisLiked] = useState(false);
  const [userFavGame,setUserFavGame]=useState();
  const [userNoFavGame,setUserNoFavGame]=useState();
  const setFavGame = async(gameName)=>{
    const user = auth.currentUser;
    const collectionRef = doc(db, "users",user.uid);

    if(userFavGame===gameName){
    await updateDoc(collectionRef, {
      favGame:null,
    });
    }else{
    await updateDoc(collectionRef, {
      favGame:gameName,
    });
  }
    setIsLiked(!isLiked);
  }

  const setNoFavGame = async(gameName)=>{
    const user = auth.currentUser;
    const collectionRef = doc(db, "users",user.uid);
    if(userNoFavGame===gameName){
      await updateDoc(collectionRef, {
        noFavGame:null,
      });
      }else{
      await updateDoc(collectionRef, {
        noFavGame:gameName,
      });
    }
    setIsDisLiked(!isdisLiked);
  }
  
  const getUserData = async()=>{
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    setUserFavGame(docSnap.data().favGame)
    setUserNoFavGame(docSnap.data().noFavGame)
     if (docSnap.data().favGame===gameName){
      setIsLiked(true)
     }
      if(docSnap.data().noFavGame===gameName){
        setIsDisLiked(true)
      }
  }

  const getGame= async()=>{
    const aux =[]
    const q = query(collection(db, "games"), where('steam_appid','==',parseInt(id)))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      aux.push(doc)
      setGameId(doc.id)
      aux.map((item)=>{
        setGameName(item.data().name)
  
      })
    });
    setListOfGames(aux)
  }

  const getAverageListRating=async()=>{
    const q = query(collection(db, "ratings"), where('game','==',gameId))
    const querySnapshot = await getDocs(q);
    const aux=[]
    let sum=0
    if(!querySnapshot.empty){
      querySnapshot.forEach(async(docu) => {
        const collectionRef = doc(db, "ratings/",docu.id);
        const docSnap = await getDoc(collectionRef)
        aux.push(docSnap.data().rating)
      });
      setListOfRatings(aux)
      for(let i of listOfRatings) sum+=i;
  }
    setAverageRating((sum/listOfRatings.length).toFixed(2))
    
  }

  useEffect(()=>{
    getGame();
    getAverageListRating();
    getUserData();
  },[averageRating])

  return (
    <>

    <div className="gameInfo">

      {listOfGames.map((item)=>{
        return(
        <div key={item.data().steam_appid} >

          <div className="gameDetails">
            <div className="imgAndName">
            <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.01)',  border: 'none' }}>
              <img  src={item.data().header_image} style={{border: '1px solid ' }}alt=''/>
                
                <CardTitle tag="h3">{item.data().name}</CardTitle>
                <div className="gameFavButtons">
                <Button  onClick={()=>setFavGame(item.data().name)}color="link">
                    <FontAwesomeIcon className="fa-2x" icon={faThumbsUp} color={isLiked ? 'green' : 'black'} />
                  </Button>
                  <Button onClick={()=>setNoFavGame(item.data().name)}color="link">
                    <FontAwesomeIcon className="fa-2x" icon={faThumbsDown} color={isdisLiked ? 'red' : 'black'} />
                  </Button>

                </div>
              <div className="score">
                <CreateRating gameId={item.id}/>
                <p>Puntuación media <strong>{averageRating}</strong></p>
              </div>
              

              <div className="tables" style={{border: '1px solid ' }}>
                <div className="table1">
                  <CardHeader tag="header">
                    Géneros
                  </CardHeader>
                  <ListGroup flush>
                    {item.data().genres.map((genre)=>{
                      return(
                        <>
                          <ListGroupItem>{genre.description}</ListGroupItem>
                        </>)})}
                  </ListGroup>
                </div>
                <div className="table1">
                  <CardHeader tag="header">
                    Plataformas
                  </CardHeader>
                  <ListGroup flush>
                    {Object.keys(item.data().platforms).map((platform)=>{
                      return(
                        <>
                          <ListGroupItem>{platform}</ListGroupItem>
                        </>)})}
                  </ListGroup>
                </div>
              </div>
            </Card>
            </div>

          </div>
          <div className="containers">
            <div className="description">
            <h2>Conoce más sobre el juego</h2>
              {parse(item.data().about_the_game)}
            </div>
            <div className="reviews">
            <div className="reviewForm">
              <h2>Opiniones de los jugadores</h2>
                
                <CreateReview gameId={item.id} gameN={item.data().name}/>
              </div>
                <ShowReviews gameId={item.id}/>
            </div>

          </div>

        </div>
        )
      })}
      </div>
    </>
  );

}
export default GameDetails;