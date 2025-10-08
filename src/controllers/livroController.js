import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autor } from "../models/index.js";
import { livro } from "../models/index.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;

      const livroEncontrado = await livro
        .findById(id)
        .populate("autor", "nome")
        .exec();

      if (livroEncontrado !== null) {
        res.status(200).json(livroEncontrado);
      } else {
        next(new NaoEncontrado("Id do livro não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      if (autorEncontrado) {
        const livroCompleto = {
          ...novoLivro,
          autor: { ...autorEncontrado._doc },
        };
        const livroCriado = await livro.create(livroCompleto);
        return res
          .status(201)
          .json({ message: "Criado com sucesso", livro: livroCriado });
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const id = req.params.id;

      const livroEncontrado = await livro.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (livroEncontrado !== null) {
        res.status(200).json({ message: "Livro atualizado com sucesso." });
      } else {
        next(new NaoEncontrado("Id do livro não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async deletarLivro(req, res, next) {
    try {
      const id = req.params.id;

      const livroEncontrado = await livro.findByIdAndDelete(id);

      if (livroEncontrado !== null) {
        res.status(200).json({ message: "Livro removido com sucesso!" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivrosPorFiltro(req, res, next) {
    try {
      const busca = processarBusca(req.query);

      const livrosResultado = await livro.find(busca);
      res.status(200).json(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  }
}

function processarBusca(filtros) {
  const { editora, titulo, minPaginas, maxPaginas } = filtros;

  const busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.paginas = {};

  //gte = maior ou igual que
  //lte = menor ou igual que
  if (minPaginas) busca.paginas.$gte = minPaginas;
  if (maxPaginas) busca.paginas.$lte = maxPaginas;

  return busca;
}

export default LivroController;
