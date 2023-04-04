import { updatePassword } from 'firebase/auth';
import { useState } from 'react';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {auth} from '../../api/firebaseConfig'
function ChangePassword(){
const user = auth.currentUser;
const [modal, setModal] = useState(false);
const [newPassword, setNewPassword] = useState("");
const toggle = () => {setModal(!modal);
  setNewPassword("");
}
const changePassword = ()=>{
updatePassword(user, newPassword).then(() => {
  window.location.reload(false);
}).catch((error) => {
  console.log(error)
});
}
return(
  <>
    <div>

      <Button  onClick={toggle}>
        Cambiar Contraseña
      </Button>

    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Cambiar contraseña</ModalHeader>
        <ModalBody style={{height:'150px'}}>
          <Input type='password'
            placeholder="Nueva contraseña"
            onChange={(event) => {
              setNewPassword(event.target.value);
            }}/>
        </ModalBody>
        <ModalFooter>
          <Button  disabled={newPassword.trim().length <= 0} onClick={changePassword}>
          Confirmar 
          </Button>
        </ModalFooter>
      </Modal>
  </div>
  </>
)

}
export default ChangePassword;