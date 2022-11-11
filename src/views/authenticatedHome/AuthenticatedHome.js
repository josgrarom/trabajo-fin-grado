import './AuthenticatedHome.css';
import Logo from '../../constants/Logo.js';
import {firebaseConfig} from '../../api/firebaseConfig'
import Game from '../../components/game/Game';

function AuthenticatedHome() {

  return (

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
  );
}

export default AuthenticatedHome;