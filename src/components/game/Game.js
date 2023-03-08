import React, {  useState } from 'react'
import './Game.css'
import { Link } from 'react-router-dom';
import { Card, CardBody, CardText, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';

function Game(props){
  var generos=[]
  const aux = props.genres
  aux.map((item)=>{
    generos.push(item.description)
  })

  var plataformas=[]
  const aux2=props.platforms
  for (let key in aux2) {
    plataformas.push(key)
  }

  return (
    <Link to={`/game/${props.idGame}`}>
    <div className='gameContainer'>
      <Card>
        {<img
          className='gameImg'
          src={props.image}
          alt=''
        />}
        <CardBody>
          <CardTitle  className='gameName'>
            {props.name}
          </CardTitle>
          <ListGroup flush>
          <ListGroupItem>
            Géneros: {generos.join(', ')}
          </ListGroupItem>
          <ListGroupItem>
            Plataformas: {plataformas.join(', ')}
          </ListGroupItem>
        </ListGroup>
        </CardBody>
      </Card>
    </div>
    </Link>
  )
}

export default Game;