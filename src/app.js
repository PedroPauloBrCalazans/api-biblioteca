//iniciar a parte do express
import express from "express";

const app = express();

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

export default app;
