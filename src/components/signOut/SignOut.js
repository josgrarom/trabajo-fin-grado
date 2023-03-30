import { Button } from 'reactstrap';
import {firebaseConfig} from '../../api/firebaseConfig';

function SignOut(){
  return(      
  <div>
    <Button size="sm" color="danger" onClick={()=>firebaseConfig.auth().signOut()}>cerrar sesion</Button>
  </div>);
}


export default SignOut;