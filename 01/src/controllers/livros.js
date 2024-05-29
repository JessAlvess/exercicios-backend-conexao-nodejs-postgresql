const pool = require("../bd-postgres");

class Livros {
  async cadastrarLivro(req, res) {
    let { nome, genero, editora, data_publicacao } = req.body;
    const { id } = req.params;

    if (!nome) {
      return res.status(404).json({
        mensagem: "O campo nome é obrigatório!",
      });
    }
    try {
      const queryInsert = `
        INSERT INTO livros (nome, genero, editora, data, autor_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `;
      const params = [nome, genero, editora, data_publicacao, id];
      const result = await pool.query(queryInsert, params);

      return res.status(201).json(result.rows[0]);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async buscarLivros(req, res) {
    try {
      const querySelect = `
       
      SELECT l.id,
      l.nome,
      l.genero,
      l.editora,
      l.data,
        json_build_object(
            'id', a.id,
            'nome', a.nome,
            'idade', a.idade
        )
        as Autor
    
        FROM livros l
        JOIN autores a
        ON l.autor_id = a.id;
        `;

      const result = await pool.query(querySelect);
      if (result.rows.length === 0) {
        return res.status(404).json({ mensagem: "Autor não encontrado" });
      }
      return res.status(200).json(result.rows);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

module.exports = new Livros();
