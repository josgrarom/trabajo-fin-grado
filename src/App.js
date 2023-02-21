import './App.css';
import {firebaseConfig,db} from './api/firebaseConfig'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/home/Home';
import React,{useEffect, useState} from "react";
import AuthenticatedHome from './views/authenticatedHome/AuthenticatedHome';
import Navbar from './components/navBar/NavBar';
import UserProfile from './views/userProfile/UserProfile';
import UserGamesInList from './components/userGamesInList/UserGamesInList';
import GameDetails from './components/gameDetails/GameDetails';
import SignUp from './views/login/SignUp';
import LogIn from './views/login/LogIn';
import SetUserName from './views/setUserName/SetUserName';
import { doc,getDoc } from 'firebase/firestore';
import FilterUsers from './components/filterUsers/FilterUsers';
import Follows from './views/userProfile/Follows';
import PersonalData from './views/userProfile/PersonalData';
import GamesLibrary from './views/userProfile/GamesLibrary';
function App() {
  const[user,setUser] = React.useState(null);
  const[userName,setUserName] = useState(false);

  useEffect( ()=>{

    firebaseConfig.auth().onAuthStateChanged(async (firebaseUser)=>{
      setUser(firebaseUser);
      const docRef = doc(db, "users",firebaseUser.uid );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserName(true);
      }
    })
  },[user])
  return(
  <>
  <Router>
    <Navbar/>      
      <Routes>
        <Route exact path='/'  element={user ? (userName?<AuthenticatedHome/>: <SetUserName/>) : <Home />}/>
        <Route exact path='/user-profile' element={user ? (userName?<UserProfile/>: <SetUserName/>) : <SignUp setUser={setUser}/>}/>
        <Route exact path='/list/:name' element={user ? (userName?<UserGamesInList/>: <SetUserName/>) : <SignUp setUser={setUser}/>}/>
        <Route exact path='/game/:id' element={user ? (userName?<GameDetails/>: <SetUserName/>) : <SignUp setUser={setUser}/>}/>
        <Route exact path='/users' element={user ? (userName?<FilterUsers/>: <SetUserName/>) : <SignUp setUser={setUser}/>}/>
        <Route exact path='/sign-up' element={user ?<AuthenticatedHome/> :<SignUp setUser={setUser}/>}/>
        <Route exact path='/log-in' element={user ? (userName?<AuthenticatedHome/>: <SetUserName/>) : <LogIn setUser={setUser}/>}/>
        <Route exact path='/profile' element={user ? (userName?<UserProfile/>: <SetUserName/>) : <SignUp setUser={setUser}/>}/>
        <Route exact path='/profileData' element={user ? (userName?<PersonalData/>: <SetUserName/>) : <SignUp setUser={setUser}/>}/>
        <Route exact path='/gamesList' element={user ? (userName?<GamesLibrary/>: <SetUserName/>) : <SignUp setUser={setUser}/>}/>
        <Route exact path='/followsList'element={user ? (userName?<Follows/>: <SetUserName/>) : <SignUp setUser={setUser}/>}/>
      </Routes>
  </Router>
    
  </>);
 
}

export default App;
