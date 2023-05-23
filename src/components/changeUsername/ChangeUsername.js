import { updatePassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {auth, db} from '../../api/firebaseConfig'
function ChangeUsername(){
const user = auth.currentUser;
const [modal, setModal] = useState(false);
const [newUserName, setNewUserName] = useState("");
const toggle = () => {setModal(!modal);
  setNewUserName("");
}
const setUserName = async()=>{
  const user = auth.currentUser;
  const collectionRef = doc(db, "users/",user.uid);
  await updateDoc(collectionRef, {
    username:newUserName
  });
  window.location.reload(false);
}
return(
  <>
    <div>

      <Button  onClick={toggle}>
        Cambiar Nombre de usuario
      </Button>

    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Cambiar nombre de usuario</ModalHeader>
        <ModalBody style={{height:'150px'}}>
          <Input
            placeholder="Nueva username"
            onChange={(event) => {
              setNewUserName(event.target.value);
            }}/>
        </ModalBody>
        <ModalFooter>
          <Button  disabled={newUserName.trim().length <= 0} onClick={setUserName}>
          Confirmar 
          </Button>
        </ModalFooter>
      </Modal>
  </div>
  </>
)

}
export default ChangeUsername;