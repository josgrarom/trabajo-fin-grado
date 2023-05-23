
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const axios=require('axios')
const cors=require('cors');

app.use(cors())

app.get('/test/:id',(req,res)=>{
 
  axios.get('https://store.steampowered.com/api/appdetails?appids=' + req.params.id)
  .then((data)=>{
      console.log(data.data)
      res.json(data.data)
  })
})

app.get('/juegosId',(req,res)=>{
  axios.get('https://api.steampowered.com/ISteamApps/GetAppList/v2/')
  .then((data)=>{
      res.json(data.data)
  })
})

app.get('/gamesData/:id',(req,res)=>{
  axios.get('https://steamspy.com/api.php?request=all&page='+ req.params.id)
  .then((data)=>{
    res.json(data.data)
  })
})



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});