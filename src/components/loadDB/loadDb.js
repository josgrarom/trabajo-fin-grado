
import { Button } from "reactstrap";
import { db,auth } from "../../api/firebaseConfig";
import { collection, addDoc} from "firebase/firestore";

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

 function PruebaCarga() {
  const user = auth.currentUser;

  const getGames = async ()=>{
    if(user.email==="hola@hola.com"){
    /*   const games =[]
      for(let i=1; i<=60; i++){
        const data = await fetch(`http://localhost:3001/gamesData/` + i)
        const ids = await data.json()
        const test = Object.entries(ids)
        test.map((test2)=>(
          games.push(parseInt(test2[0]))
        ))
       } 
    
      console.log(games.length)
    
       for(let i=0; i<=games.length-1; i++){ 
        try {
          const data = await  fetch(`http://localhost:3001/test/${games[i]}`);
          const info = await data.json()
          const game = info[games[i]].data
    
          
        if(info[games[i]].success===true){
          const collectionRef = collection(db, "games");
          await addDoc(collectionRef, game);
          console.log(game.name)
        }
      } catch( ex ) {
      }
    
      await delay(1100);
      } */
     } 
    }

  return (
    <div className="root">
      <Button className="button" onClick={getGames}>
        Cargar base de datos
      </Button>
    </div>
  );
}

export default PruebaCarga;