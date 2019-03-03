const express = require ('express');
const cors = require ('cors');
const fetch = require ('node-fetch');
const bodyParser = require('body-parser');
const app = express();
var filmsArray = [];

app.use(cors());
app.use(bodyParser.json());


fetch('https://rss.itunes.apple.com/api/v1/us/movies/top-movies/all/25/explicit.json')
  .then(response=>response.json())
  .then(response=>{
    for (var i=0; i<=24; i++){
      var obj = {
        name: response.feed.results[i].name,
        artworkUrl100: response.feed.results[i].artworkUrl100,
        url: response.feed.results[i].url,
        fav: false,
        number: i
      }
      filmsArray.push(obj);
    }

app.get('/', (req, res)=>{
    res.send(filmsArray);
  });
})
app.put('/', (req, res)=>{
  const {number, fav} = req.body;
  filmsArray[number].fav = fav;
  console.log('changed the state');
})


app.listen(3001, ()=> {
  console.log('app is running');
})