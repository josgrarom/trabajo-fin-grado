import {deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
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
  <button onClick={deleteAccount}>Borrar cuenta</button>
  </>
)

}
export default DeleteUser;