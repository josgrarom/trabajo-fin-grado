import {deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { useState } from "react";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import {auth,db} from '../../api/firebaseConfig'
function DeleteUser(){
const user = auth.currentUser;
const [modal, setModal] = useState(false);
const toggle = () => {setModal(!modal);

}
const deleteAccount= async()=>{
await deleteDoc(doc(db, "users", user.uid));
deleteUser(user).then(() => {
  
}).catch((error) => {
  // An error ocurred
  // ...
});
}
return(
  <>

      <Button color="danger" onClick={toggle}>Borrar cuenta</Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>¿Seguro que quieres borrar la cuenta?</ModalHeader>
        <ModalBody style={{height:'150px'}}>
          <div className="confirmButton">
          <Button color="danger" onClick={deleteAccount}>Borrar cuenta</Button>
          </div>
        </ModalBody>
      </Modal>

  </>
)

}
export default DeleteUser;