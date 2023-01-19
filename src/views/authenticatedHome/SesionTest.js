import './AuthenticatedHome.css';
import Logo from '../../constants/Logo.js';
import SignOut from '../../components/signOut/SignOut';
import {auth,database,db} from '../../api/firebaseConfig'
import {ref, set } from "firebase/database";
import { doc, addDoc,setDoc,updateDoc} from "firebase/firestore";

const setUsernamefr = async()=>{
  const user = auth.currentUser;
  const collectionRef = doc(db, "users/",user.uid);
  await updateDoc(collectionRef, {
    username: 'test2',
    email:user.email,
    'listas.lista1':[300,101,203]
  });
  console.log('usuario actualizado')
}
const setUsernamedb = ()=>{
  const user = auth.currentUser;
  set(ref(database, 'users/' + user.uid), {
    username: 'test2',
    email:user.email
  });
  console.log('usuario actualizado')
}

function SesionTest() {
  const user = auth.currentUser;
  return (
    <div>
      <Logo/>
        <h1>{user.email}</h1>
        <button className="button" onClick={setUsernamefr}>
        Añadir username
      </button>
      <SignOut/>
    </div>
  );
}

export default SesionTest;