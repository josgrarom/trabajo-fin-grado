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
import SignIn from './views/login/SignIn';
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
  },[])
  return(
  <>
  <Router>
    <Navbar/>      
      <Routes>
        <Route exact path='/'  element={user ? (userName?<AuthenticatedHome/>: <SetUserName/>) : <Home />}/>
        <Route exact path='/user-profile' element={user?<UserProfile/>: <SignUp setUser={setUser}/>}/>
        <Route exact path='/list/:name' element={<UserGamesInList/>}/>
        <Route exact path='/game/:id' element={<GameDetails/>}/>
        <Route exact path='/users' element={<FilterUsers/>}/>
        <Route exact path='/about' element={<SetUserName/>}/>
        <Route exact path='/sign-up' element={user ?<AuthenticatedHome/> :<SignUp setUser={setUser}/>}/>
        <Route exact path='/sign-in' element={user ?<AuthenticatedHome/> :<SignIn setUser={setUser}/>}/>
        <Route exact path='/profile' element={user?<UserProfile/>: <SignUp setUser={setUser}/>}/>
        <Route exact path='/profileData' element={user?<PersonalData/>: <SignUp setUser={setUser}/>}/>
        <Route exact path='/gamesList' element={user?<GamesLibrary/>: <SignUp setUser={setUser}/>}/>
        <Route exact path='/followsList' element={user?<Follows/>: <SignUp setUser={setUser}/>}/>
      </Routes>
  </Router>
    
  </>);
 
}

export default App;
