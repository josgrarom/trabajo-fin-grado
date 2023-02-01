import { React, useState } from "react";
import { TextField } from "@mui/material";
import GamesList from "../gamesList/GamesList";
import { collection, query, limit, endAt,startAt, orderBy } from "firebase/firestore";
import { db} from '../../api/firebaseConfig';
function SearchBar() {
  const [inputText, setInputText] = useState("");
  
  let inputHandler = (e) => {
    const arr = e.target.value.split(" ");

    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  
  }
  const str2 = arr.join(" ");
    setInputText(str2);
  };
  const q = query(collection(db, "games"),orderBy('name','asc'),startAt(inputText),endAt(inputText +"\uf8ff"),limit(30));
  const q2=query(collection(db, "games"), limit(30),orderBy('recommendations','desc'));
  return (
    <div className="main">
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

export default SearchBar;