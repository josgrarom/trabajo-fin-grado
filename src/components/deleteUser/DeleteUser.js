import {deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { useState } from "react";
import { Alert, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import {auth,db} from '../../api/firebaseConfig'
function DeleteUser(){
const user = auth.currentUser;
const [modal, setModal] = useState(false);
const onDismiss = () => setVisible(false);
const [visible, setVisible] = useState(false);
const toggle = () => {setModal(!modal);

}
const deleteAccount= ()=>{

deleteUser(user).then(async() => {
  await deleteDoc(doc(db, "users", user.uid));
}).catch((error) => {
  setVisible(true)
  console.log(error)
});
}
return(
  <>

      <Button color="danger" onClick={toggle}>Borrar cuenta</Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>¿Seguro que quieres borrar la cuenta?</ModalHeader>
        <ModalBody style={{height:'190px'}}>
        <Alert color="danger" isOpen={visible} toggle={onDismiss}>
          Es necesario que vuelva a iniciar sesión si quiere borrar su cuenta
        </Alert>
          <div className="confirmButton">
          <Button color="danger" onClick={deleteAccount}>Borrar cuenta</Button>
          </div>
        </ModalBody>
      </Modal>

  </>
)

}
export default DeleteUser;