import { updatePassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert, Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {auth} from '../../api/firebaseConfig'
function ChangePassword(){
const user = auth.currentUser;
const [modal, setModal] = useState(false);
const [visible, setVisible] = useState(false);
const onDismiss = () => setVisible(false);
const [newPassword, setNewPassword] = useState("");
const toggle = () => {setModal(!modal);
  setNewPassword("");
}
const changePassword = ()=>{
updatePassword(user, newPassword).then(() => {
  window.location.reload(false);
}).catch((error) => {
  setVisible(true)
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
        <ModalBody style={{height:'200px'}}>
      
        <Alert color="danger" isOpen={visible} toggle={onDismiss}>
          Es necesario que vuelva a iniciar sesión si quiere cambiar su contraseña.
        </Alert>
          <Input type='password'
          pattern=".{6,}"
            placeholder="Nueva contraseña"
            onChange={(event) => {
              setNewPassword(event.target.value);
            }}/>
       
        </ModalBody>
        <ModalFooter>
          <Button  disabled={newPassword.trim().length <= 5} onClick={changePassword}>
          Confirmar 
          </Button>
        </ModalFooter>
      </Modal>
  </div>
  </>
)

}
export default ChangePassword;