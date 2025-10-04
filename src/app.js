//iniciar a parte do express
import express from "express";
import connectDataBase from "./data/dbConnect.js";
import "dotenv/config"; // já carrega automaticamente o .env
import routes from "./routes/index.js";
import manipuladorDeErros from "./middleware/manipuladorDeErros.js";
import manipulador404 from "./middleware/manipulador404.js";

const conexao = await connectDataBase();

conexao.on("error", (erro) => {
  console.error("Erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("Conexão com BD feita com sucesso");
});

const app = express();
routes(app);

app.use(manipulador404); //colocar apos de routes(app), para o codigo de middleware seja executado apenas se nenhuma das rotas tenha correspondência com a URL.

app.use(manipuladorDeErros); //middleware: função especial do express, para intercepta qualquer erro que for lançado pela aplicação

export default app;
