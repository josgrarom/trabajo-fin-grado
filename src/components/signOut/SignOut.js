import {firebaseConfig} from '../../api/firebaseConfig';

function SignOut(){
  return(      
  <div>
    <button onClick={()=>firebaseConfig.auth().signOut()}>cerrar sesion</button>
  </div>);
}


export default SignOut;