import './Home.css';
import Logo from '../../constants/Logo.js';
import Feature from '../../components/feature/Feature';
import SignOut from '../../components/signOut/SignOut';

function Home() {
  return (  
    <div className='home'>
      <div className='homeText'>
        <h1 className='homeTitle'>¡Bienvenido a myGameshdb!</h1>
        <p className='homeDescription'>Descripción en proceso</p>
      </div>
      <div className="featuresContainer">
        <Feature
          name='Busqueda de títulos'
          description='Descubre nuevos títulos.'
          image='search.png'/>

        <Feature
          name='Creación de listas'
          description='Crea listas personalizadas con tus juegos favoritos.'
          image='list.png'/>

        <Feature
          name='Lista de amigos'
          description='Agrega a personas a tu lista de amgios para poder estar al tanto
          de sus opiniones y títulos favoritos.'
          image='friendList.png'/>

        <Feature
          name='Soporte de steam'
          description='Enlaza tu cuenta de steam para obtener una mejor experiencia.'
          image='steam.png'/>
          
      </div>
      <SignOut/>
    </div>
  );
}

export default Home;
