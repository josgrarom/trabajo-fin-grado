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
import SignUp from './views/login/SignUp';
import LogIn from './views/login/LogIn';
import SetUserName from './views/setUserName/SetUserName';
import { doc,getDoc } from 'firebase/firestore';
import Follows from './views/userProfile/Follows';
import PersonalData from './views/userProfile/PersonalData';
import GamesLibrary from './views/userProfile/GamesLibrary';
import ReviewsList from './views/userProfile/ReviewsList';
import FindUsers from './views/findUsers/FindUsers';
import { Spinner } from 'reactstrap';
function App() {
  const[user,setUser] = React.useState(null);
  const[userName,setUserName] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect( ()=>{
    
    firebaseConfig.auth().onAuthStateChanged(async (firebaseUser)=>{
      setUser(firebaseUser);
      setLoading(false);
      const docRef = doc(db, "users",firebaseUser.uid );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserName(true);
        
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
        <Route exact path='/'  element={user ? (userName?<AuthenticatedHome/>: <SetUserName/>) : <Home />}/>
        <Route exact path='/user-profile' element={user ? (userName?<UserProfile/>: <SetUserName/>) : <SignUp setUser={setUser}/>}/>
        <Route exact path='/about' element={<Home/>}/>
        <Route exact path='/list/:name/:user' element={user ? (userName?<UserGamesInList/>: <SetUserName/>) : <SignUp setUser={setUser}/>}/>
        <Route exact path='/game/:id' element={user ? (userName?<GameDetails/>: <SetUserName/>) : <SignUp setUser={setUser}/>}/>
        <Route exact path='/user/:id' element={user ? (userName?<UserProfile user={user.uid}/>: <SetUserName/>) : <SignUp setUser={setUser}/>}/>
        <Route exact path='/users' element={user ? (userName?<FindUsers/>: <SetUserName/>) : <SignUp setUser={setUser}/>}/>
        <Route exact path='/sign-up' element={user ?<AuthenticatedHome/> :<SignUp setUser={setUser}/>}/>
        <Route exact path='/log-in' element={user ? (userName?<AuthenticatedHome/>: <SetUserName/>) : <LogIn setUser={setUser}/>}/>
        <Route exact path='/profile' element={user ? (userName?<UserProfile/>: <SetUserName/>) : <SignUp setUser={setUser}/>}/>
        <Route exact path='/profileData' element={user ? (userName?<PersonalData/>: <SetUserName/>) : <SignUp setUser={setUser}/>}/>
        <Route exact path='/gamesList' element={user ? (userName?<GamesLibrary/>: <SetUserName/>) : <SignUp setUser={setUser}/>}/>
        <Route exact path='/followsList'element={user ? (userName?<Follows/>: <SetUserName/>) : <SignUp setUser={setUser}/>}/>
        <Route exact path='/reviewsList'element={user ? (userName?<ReviewsList/>: <SetUserName/>) : <SignUp setUser={setUser}/>}/>
      </Routes>
  </Router>
    
  </>);
 
}

export default App;
