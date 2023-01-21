import './App.css';
import {firebaseConfig} from './api/firebaseConfig'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/home/Home';
import Login from './views/login/Login'
import React,{useEffect} from "react";
import AuthenticatedHome from './views/authenticatedHome/AuthenticatedHome';
import Navbar from './components/navBar/NavBar';
import UserProfile from './views/userProfile/UserProfile';
import CreateList from './views/createList/CreateList';
function App() {
  const[user,setUser] = React.useState(null);
  
  useEffect( ()=>{
    firebaseConfig.auth().onAuthStateChanged((firebaseUser)=>{
      console.log("ya tienes sesión iniciada con:",firebaseUser);
      setUser(firebaseUser);
    })
  },[])
  return(
  <>
  <Router>
    <Navbar/>      
      <Routes>
        <Route exact path='/'  element={user ? <AuthenticatedHome/> : <Home />}/>
        <Route exact path='/user-profile' element={<UserProfile/>}/>
        <Route exact path='/aux' element={<CreateList/>}/>
        <Route exact path='/sign-up' element={<Login setUser={setUser}/>}/>
      </Routes>
  </Router>
    
  </>);
 
}

export default App;
