const app = require("express").Router();
const axios = require("axios");
const serverKey = process.env.OMDB_KEY;
const movies = require("../data/top250imdb.json");

app.get("/searchmovie/:keyword", (req, res) => {
  axios.get(`${serverKey}s=${req.params.keyword}`).then((response) => {
    let data = response.data;
    res.json(data);
  });
});

app.get("/searchmovie/:keyword/:page", (req, res) => {
  axios
    .get(`${serverKey}s=${req.params.keyword}&page=${req.params.page}`)
    .then((response) => {
      let data = response.data;
      res.json(data);
    });
});

app.get("/recommendations", (req, res) => {
  let data = [];
  let movie = [];
  while (data.length < 20) {
    let num = Math.floor(Math.random() * 250);
    if (!data.includes(num)) {
      data.push(num);
      movie.push(movies[num]);
    }
  }
  res.json(movie);
});

app.get("/getmovie/:movieid", (req, res) => {
  axios
    .get(`${serverKey}i=${req.params.movieid}&plot=full`)
    .then((response) => {
      let data = response.data;
      res.json(data);
    });
});

module.exports = app;
