//ponto de entrada das rotas, e o resto da app vai acessar
import express from "express";
import livros from "./livrosRoutes.js";

const routes = (app) => {
  app.use(express.json(), livros);
};

export default routes;

//use e o metodo que usamos para incluir middleware na instancia do express
// middleware/ter acesso as requisições e resposta no momentos que estão sendo feitas, pode modificar objetos e informações extras.
