import { React, useState } from "react";
import { TextField } from "@mui/material";
import GamesList from "../gamesList/GamesList";
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
      
        <GamesList input={inputText} userC={userChoice} userC2={userChoice2}/>
  
    </div>
  );
}

export default FilterGames;