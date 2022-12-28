// login

const getMoviesFromApi = (params) => {
  console.log(params);
  console.log("Se están pidiendo las películas de la app");
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch(`//localhost:4000/movies?gender=${params.gender}`)
<<<<<<< HEAD
    .then(response => response.json())
    .then(data => {
=======
    .then((response) => response.json())
    .then((data) => {
>>>>>>> 276d0e60a524db59aaa093d085195e1cb38e15d8
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
