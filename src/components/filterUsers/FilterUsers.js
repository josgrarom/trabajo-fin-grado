import { React, useState } from "react";
import { TextField } from "@mui/material";
import UsersList from "../usersList/UsersList";
function FilterUsers() {
  const [inputText, setInputText] = useState("");
 
  let inputHandler = (e) => {
    const arr = e.target.value.split(" ");

    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0) + arr[i].slice(1);
  
  }
  const str2 = arr.join(" ");
    setInputText(str2);
  };
  
  return (
    <div>  
      <div className="searchUsers">
          <TextField
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            label="Search"/>
      </div>
      <UsersList input={inputText}/>

    </div>
  );
}

export default FilterUsers;