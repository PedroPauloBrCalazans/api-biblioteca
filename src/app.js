//iniciar a parte do express
import express from "express";
import connectDataBase from "./data/dbConnect.js";
import "dotenv/config"; // já carrega automaticamente o .env
import livro from "./models/Livro.js";

const conexao = await connectDataBase();

conexao.on("error", (erro) => {
  console.error("Erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("Conexão com BD feita com sucesso");
});

const app = express();
app.use(express.json()); // middleware/ter acesso as requisições e resposta no momentos que estão sendo feitas, pode modificar objetos e informações extras.

app.get("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  res.status(200).json(livros[index]);
});

app.post("/livros", (req, res) => {
  livros.push(req.body);
  res.status(201).send("Criado com sucesso!");
});

app.put("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  livros[index].titulo = req.body.titulo;
  res.status(200).json(livros);
});

app.delete("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  livros.splice(index, 1);
  res.status(200).send("Livro removido com sucesso");
});

export default app;
