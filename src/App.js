import './App.css';
import {firebaseConfig,db} from './api/firebaseConfig'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/home/Home';
import React,{useEffect, useState} from "react";
import AuthenticatedHome from './views/authenticatedHome/AuthenticatedHome';
import Navebar from './components/navBar/NavBar';
import UserProfile from './views/userProfile/UserProfile';
import UserGamesInList from './components/userGamesInList/UserGamesInList';
import GameDetails from './components/gameDetails/GameDetails';
import SetUserName from './views/setUserName/SetUserName';
import { doc,getDoc } from 'firebase/firestore';
import Follows from './views/userProfile/Follows';
import PersonalData from './views/userProfile/PersonalData';
import GamesLibrary from './views/userProfile/GamesLibrary';
import ReviewsList from './views/userProfile/ReviewsList';
import FindUsers from './views/findUsers/FindUsers';
import { Spinner } from 'reactstrap';
function App() {
  const[user,setUser] = useState(null);
  const[userName,setUserName] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect( ()=>{
    
    firebaseConfig.auth().onAuthStateChanged(async (firebaseUser)=>{
      setUser(firebaseUser);
      if(firebaseUser!==null){
      const docRef = doc(db, "users",firebaseUser.uid );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserName(true);
        setLoading(false);
      }else{setLoading(false);}
    }else{
      setLoading(false);
    }
    })
    
  },[user])
 
  if (loading) {
    return <Spinner />;
  }
  return(
  <>
  <Router>
    <Navebar/>      
      <Routes>
        <Route exact path='/'  element={user ? (userName?<AuthenticatedHome/>: <SetUserName/>) : <Home/>}/>
        <Route exact path='/user-profile' element={user ? (userName?<UserProfile/>: <SetUserName/>) : <Home/>}/>
        <Route exact path='/about' element={<Home/>}/>
        <Route exact path='/list/:name/:user' element={user ? (userName?<UserGamesInList/>: <SetUserName/>) : <Home/>}/>
        <Route exact path='/game/:id' element={user ? (userName?<GameDetails/>: <SetUserName/>) : <Home/>}/>
        <Route exact path='/user/:id' element={user ? (userName?<UserProfile user={user.uid}/>: <SetUserName/>) : <Home/>}/>
        <Route exact path='/users' element={user ? (userName?<FindUsers/>: <SetUserName/>) : <Home/>}/>
        <Route exact path='/profile' element={user ? (userName?<UserProfile/>: <SetUserName/>) : <Home/>}/>
        <Route exact path='/profileData' element={user ? (userName?<PersonalData/>: <SetUserName/>) : <Home/>}/>
        <Route exact path='/gamesList' element={user ? (userName?<GamesLibrary/>: <SetUserName/>) : <Home/>}/>
        <Route exact path='/followsList'element={user ? (userName?<Follows/>: <SetUserName/>) : <Home/>}/>
        <Route exact path='/reviewsList'element={user ? (userName?<ReviewsList/>: <SetUserName/>) : <Home/>}/>
      </Routes>
  </Router>
    
  </>);
 
}

export default App;
