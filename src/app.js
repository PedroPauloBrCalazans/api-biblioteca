//iniciar a parte do express
import express from "express";
import connectDataBase from "./data/dbConnect.js";
import "dotenv/config"; // já carrega automaticamente o .env
import routes from "./routes/index.js";
import manipuladorDeErros from "./middleware/manipuladorDeErros.js";

const conexao = await connectDataBase();

conexao.on("error", (erro) => {
  console.error("Erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("Conexão com BD feita com sucesso");
});

const app = express();
routes(app);

app.use(manipuladorDeErros); //middleware: função especial do express, para intercepta qualquer erro que for lançado pela aplicação

export default app;
