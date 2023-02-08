import { React, useState } from "react";
import { TextField } from "@mui/material";
import GamesList from "../gamesList/GamesList";
import { collection, query, limit, endAt,startAt, orderBy } from "firebase/firestore";
import { db} from '../../api/firebaseConfig';
import Select from 'react-select'
function FilterGames() {
  const [inputText, setInputText] = useState("");
  const [userChoice,setUserChoice] = useState('recommendations');
  const [userChoice2,setUserChoice2] = useState('desc');
  const options = [
    { value: 'recommendations', label: 'Recomendaciones' },
    { value: 'name', label: 'Nombre' },
    { value: 'metacritic', label: 'Puntuación en metacritic'},
    { value: 'release_date.date', label: 'Fecha de lanzamiento'},
  ]

  const options2 = [
    { value: 'asc', label: 'Ascendete' },
    { value: 'desc', label: 'Descendente' },
  ]
 
  let inputHandler = (e) => {
    const arr = e.target.value.split(" ");

    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  
  }
  const str2 = arr.join(" ");
    setInputText(str2);
  };


  const q = query(collection(db, "games"),orderBy('name','asc'),startAt(inputText),endAt(inputText +"\uf8ff"),limit(30));
  const q2=query(collection(db, "games"), limit(30),orderBy(userChoice,userChoice2));
  return (
    <div className="main">
      <Select options={options} 
        onChange={(choice) => setUserChoice(choice.value)}
        placeholder={'Recomendaciones'}/>
        
      <Select options={options2} 
        onChange={(choice) => setUserChoice2(choice.value)}
        placeholder={'Descendente'}/>
        
      <h1>React Search</h1>
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>
      {inputText===''?
        (<GamesList q={q2}/>):
        (<GamesList q={q}/>)
      }
    </div>
  );
}

export default FilterGames;