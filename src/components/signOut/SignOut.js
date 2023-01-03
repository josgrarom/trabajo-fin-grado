import {firebaseConfig} from '../../api/firebaseConfig';

function aux(){
  return(
    firebaseConfig.auth().signOut()
  )
}

function SignOut(){
  return(      
  <div>
    <button onClick={aux}>cerrar sesion</button>
  </div>);
}


export default SignOut;