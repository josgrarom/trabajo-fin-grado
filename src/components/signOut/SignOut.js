import { Button } from 'reactstrap';
import {firebaseConfig} from '../../api/firebaseConfig';

function SignOut(){

  const cerrarSesion =()=>{
    firebaseConfig.auth().signOut()
    window.location.reload(false);
  }
  return(      
  <div>
    <Button size="sm" color="danger" onClick={()=>cerrarSesion()}>Cerrar sesión</Button>
  </div>);
}


export default SignOut;