import './AuthenticatedHome.css';
import Logo from '../../constants/Logo.js';
import Game from '../../components/game/Game';
import SignOut from '../../components/signOut/SignOut';

function AuthenticatedHome() {

  return (
    <div>
      <Logo/>
      <div className='authenticatedHome'>
        
        <div className='searchContainer'>
          <div className='gamesContainer'>
            <Game 
              image='test.jpg'
              name='God of war'
              players='3000 jugadores'
              hours='300 horas medias'
              rating='9/10'
              reviews='50'/>
          </div>
        </div>
      </div>
      <SignOut/>
    </div>
  );
}

export default AuthenticatedHome;