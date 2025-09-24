//iniciar a parte do express
import express from "express";

const app = express();
app.use(express.json()); // middleware/ter acesso as requisições e resposta no momentos que estão sendo feitas, pode modificar objetos e informações extras.

const livros = [
  {
    id: 1,
    titulo: "Cabeça fria, coração quente",
  },
  {
    id: 2,
    titulo: "O senhor dos Anéis",
  },
];

app.get("/livros", (req, res) => {
  res.status(200).json(livros);
});

app.post("/livros", (req, res) => {
  livros.push(req.body);
  res.status(201).send("Criado com sucesso!");
});

export default app;
