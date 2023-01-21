import './AuthenticatedHome.css';
import Logo from '../../constants/Logo.js';
import SignOut from '../../components/signOut/SignOut';
import GamesList from '../../components/gamesList/GamesList';

function AuthenticatedHome() {
  return (
    <div>
      <Logo/>
      <GamesList/>
      <SignOut/>
    </div>
  );
}

export default AuthenticatedHome;