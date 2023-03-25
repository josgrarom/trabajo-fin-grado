import {deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { Button } from "reactstrap";
import {auth,db} from '../../api/firebaseConfig'
function DeleteUser(){
const user = auth.currentUser;

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
    <div>
      <Button onClick={deleteAccount}>Borrar cuenta</Button>
    </div>
  </>
)

}
export default DeleteUser;