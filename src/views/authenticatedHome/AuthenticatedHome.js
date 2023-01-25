import './AuthenticatedHome.css';
import Logo from '../../constants/Logo.js';
import SignOut from '../../components/signOut/SignOut';
import GamesList from '../../components/gamesList/GamesList';
import { db} from '../../api/firebaseConfig';
import { collection, query, orderBy, limit } from "firebase/firestore";

function AuthenticatedHome() {
  const q = query(collection(db, "games"), limit(30),orderBy('recommendations','desc'));
  return (
    <div>
      <Logo/>
      <GamesList q={q}/>
      <SignOut/>
    </div>
  );
}

export default AuthenticatedHome;