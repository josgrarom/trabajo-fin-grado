import './App.css';
import {firebaseConfig} from './api/firebaseConfig'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/home/Home';
import React,{useEffect} from "react";
import AuthenticatedHome from './views/authenticatedHome/AuthenticatedHome';
import Navbar from './components/navBar/NavBar';
import UserProfile from './views/userProfile/UserProfile';
import UserGamesInList from './components/userGamesInList/UserGamesInList';
import GameDetails from './components/gameDetails/GameDetails';
import SignUp from './views/login/SignUp';
import SignIn from './views/login/SignIn';
function App() {
  const[user,setUser] = React.useState(null);
  
  useEffect( ()=>{
    firebaseConfig.auth().onAuthStateChanged((firebaseUser)=>{
      setUser(firebaseUser);
    })
  },[])
  return(
  <>
  <Router>
    <Navbar/>      
      <Routes>
        <Route exact path='/'  element={user ? <AuthenticatedHome/> : <Home />}/>
        <Route exact path='/user-profile' element={user?<UserProfile/>: <SignUp setUser={setUser}/>}/>
        <Route exact path='/list/:name' element={<UserGamesInList/>}/>
        <Route exact path='/game/:id' element={<GameDetails/>}/>
        <Route exact path='/sign-up' element={user ?<AuthenticatedHome/> :<SignUp setUser={setUser}/>}/>
        <Route exact path='/sign-in' element={user ?<AuthenticatedHome/> :<SignIn setUser={setUser}/>}/>
      </Routes>
  </Router>
    
  </>);
 
}

export default App;
