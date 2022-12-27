const express = require("express");
const cors = require("cors");
const movies = require("../web/src/data/movies.json");
const users = require("../web/src/data/users.json");
const DataBase = require("better-sqlite3");
const db = new DataBase("./src/db/movies.db", { verbose: console.log });

// create and config server
const server = express();
server.use(cors());
server.use(express.json());
server.set("view engine", "ejs");

// init express aplication
const serverPort = 4000;

server.get("/movie/:movieId", (req, res) => {
  console.log(req.params);
  const foundMovie = movies.find((movies) => movies.id === req.params.movieId);
  console.log(foundMovie);
  res.render("movies", foundMovie);
});

server.get("/movies", (req, res) => {
  const query = db.prepare("SELECT * FROM movies");
  const list = query.all();
  const response = { success: true, movies: list };
  console.log(list);

  /* const genderFilterParam = req.query.gender;
  const sortFilterParam = req.query.sort;
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
  if (sortFilterParam === "asc") {
    filterGender.sort((a, b) => {
      if (a.name == b.name) {
        return 0;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 1;
    });
  } else {
    filterGender.sort((a, b) => {
      if (a.name == b.name) {
        return 0;
      }
      if (a.name > b.name) {
        return -1;
      }
      return 1;
    });
  } */
});

server.post("/login", (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const findUser = users.find(
    (eachUser) => eachUser.email === email && eachUser.password === password
  );
  if (findUser !== undefined) {
    const responseSucces = {
      success: true,
      userId: findUser.id,
    };
    res.json(responseSucces);
  } else {
    const responseFalse = {
      success: false,
      errorMessage: "Usuaria/o no encontrada/o",
    };
    res.json(responseFalse);
  }
});

server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
const staticServer = "./src/public-react";
server.use(express.static(staticServer));
const staticServerImg = "./src/public-movies-images";
server.use(express.static(staticServerImg));
