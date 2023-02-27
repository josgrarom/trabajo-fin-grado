import { updatePassword } from 'firebase/auth';
import { useState } from 'react';
import {auth} from '../../api/firebaseConfig'
function ChangePassword(){
const user = auth.currentUser;

const [newPassword, setNewPassword] = useState("");
const changePassword = ()=>{
updatePassword(user, newPassword).then(() => {
  // Update successful.
}).catch((error) => {
  // An error ocurred
  // ...
});
}
return(
  <>
      <div>
    <input
    placeholder="Nueva contraseña"
    onChange={(event) => {
      setNewPassword(event.target.value);
    }}
  />
  <button onClick={changePassword}> Cambiar contraseña</button>
  </div>
  </>
)

}
export default ChangePassword;