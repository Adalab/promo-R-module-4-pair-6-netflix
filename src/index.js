const express = require("express");
const cors = require("cors");
const movies = require("../web/src/data/movies.json");
const users = require("../web/src/data/users.json");
const DataBase = require("better-sqlite3");
const db = new DataBase("./src/db/movies.db", { verbose: console.log });
const dbb = new DataBase("./src/db/users.db", {});

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
    const query = db.prepare("SELECT * FROM movies");
  const list = query.all(); 
  console.log(list)
  res.json({ success: true, movies:list });
  
});

server.post("/login", (req, res) => {
  console.log(req.body);
  res.json({ success: true, users });
});
server.post("/sign-up", (req, res) => {
  console.log(req.body);
  const query = dbb.prepare("SELECT * FROM users WHERE email = ?");
  const result = query.get(req.body.email);
  console.log(result);
  if (result === undefined ){
    const queryInsert = dbb.prepare("INSERT INTO users (email, password) VALUES (?,?)");
   const resultInsert = queryInsert.run(req.body.email, req.body.password);
   console.log(resultInsert);
   const response = {
     success: true,
     userId: resultInsert.lastInsertRowid
   }
  res.json(response);
  } else{
    const responseError =
    {
      success: false,
      errorMessage: "Usuaria ya existente"
    }
    res.json(responseError)
  };

}); 

server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
const staticServer = "./src/public-react";
server.use(express.static(staticServer));
const staticServerImg = "./src/public-movies-images";
server.use(express.static(staticServerImg));
