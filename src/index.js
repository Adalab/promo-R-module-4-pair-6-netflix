const express = require("express");
const cors = require("cors");
const movies = require("../web/src/data/movies.json");
const users = require("../web/src/data/users.json");
const DataBase = require("better-sqlite3");
const db = new DataBase("./src/db/movies.db", {});

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;

server.get("/movie/:movieId", (req, res) => {
  console.log(req.params);
  const foundMovie = movies.find((movies) => movies.id === req.params.movieId);
  console.log(foundMovie);
});

server.get("/movies", (req, res) => {
  console.log(req.query);
  const genderFilterParam = req.query.gender;
  const filterGender = movies.filter(
    (gender) => gender.gender === genderFilterParam
  );
  if (genderFilterParam === "") {
    debugger;
    const response = { success: true, movies };
    res.json(response);
  } else {
    const response = { success: true, movies: filterGender };
    res.json(response);
  }

  console.log(filterGender);

  /*  const query = db.prepare("SELECT * FROM movies gender=?");
  const list = query.get(); */
});

server.post("/login", (req, res) => {
  console.log(req.body);
  res.json({ success: true, users });
});

server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
const staticServer = "./src/public-react";
server.use(express.static(staticServer));
const staticServerImg = "./src/public-movies-images";
server.use(express.static(staticServerImg));
