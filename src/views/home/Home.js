
import Feature from '../../components/feature/Feature';
function Home() {
  return (  
    <div className='home'>
      <div className='homeText'>
        <h1 className='homeTitle'>¡Bienvenido a Games4u!</h1>
        <p className='homeDescription'>¡Bienvenido a Games4u, la comunidad de videojuegos definitiva! 
        Aquí podrás crear tus propias listas de juegos, seguir a otros usuarios para descubrir nuevas 
        recomendaciones, escribir reseñas y calificar tus juegos favoritos. Únete a nosotros y comparte 
        tus opiniones con otros gamers de todo el mundo. ¡Que empiece la diversión!</p>
      </div>
      <div className="featuresContainer">
        <Feature
          name='Busqueda de títulos'
          description='Encuentra títulos emocionantes y sorprendentes que nunca antes habías considerado jugar.
          Únete a nuestra comunidad de jugadores y descubre tus próximos juegos favoritos.'
          image='search.png'/>

        <Feature
          name='Reviews de títulos'
          description='Comparte tus experiencias de juego y ayuda a otros jugadores a descubrir títulos que 
          valgan la pena con nuestra funcionalidad de reseñas de juegos. 
          Escribe tus propias opiniones y calificaciones sobre los juegos que hayas jugado, y 
          lee las reseñas de otros jugadores para obtener una perspectiva más amplia.'
          image='review.png'/>

        <Feature
          name='Puntuación de juegos'
          description='Nuestra funcionalidad de puntuación de juegos te permite calificar y 
          comparar los juegos que has jugado con otros títulos populares. Utiliza nuestro 
          sistema de puntuación para clasificar tus juegos favoritos y ayudar a otros jugadores a 
          descubrir los mejores títulos. Únete a nuestra comunidad de jugadores y comparte tus opiniones 
          sobre tus juegos preferidos.'
          image='star.png'/>

        <Feature
          name='Creación de listas'
          description='Crea listas personalizadas con nuestra funcionalidad de creación de listas.
          Comparte tus listas con la comunidad, descubre los gustos de otros jugadores y 
          organiza tus juegos como nunca antes.'
          image='list.png'/>

        <Feature
          name='Seguimiento de usuarios'
          description='Conoce los gustos de otros jugadores y expande tus horizontes con nuestra funcionalidad 
          de seguimiento de usuarios. Sigue a otros jugadores y descubre qué juegos están disfrutando, 
          cómo los califican y qué comentarios tienen al respecto. ¡Únete a una comunidad de jugadores 
          apasionados y expande tus opciones de juego!'
          image='friendList.png'/>
      </div>
    </div>
  );
}

export default Home;
