const pool = require("../bd-postgres");

class Autores {
  async cadastrarAutor(req, res) {
    const { nome, idade } = req.body;

    if (!nome) {
      return res.status(404).json({
        mensagem: "O campo nome é obrigatório!",
      });
    }
    try {
      const queryInsert = `
        INSERT INTO autores (nome, idade)
        VALUES ($1, $2)
        RETURNING *;
        `;
      const params = [nome, idade];
      const result = await pool.query(queryInsert, params);

      return res.status(201).json(result.rows[0]);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async buscarAutor(req, res) {
    const { id } = req.params;

    try {
      const querySelect = `
      SELECT 
      a.*,
      json_agg(
          json_build_object(
              'id', l.id,
              'nome', l.nome,
              'genero', l.genero,
              'editora', l.editora,
              'data_publicacao', l.data
          )
      ) AS livros
      FROM 
          autores a
      JOIN 
          livros l
      ON 
          a.id = l.autor_id
      WHERE
          a.id = $1
      GROUP BY 
          a.id;
      `;
      const params = [id];

      let result = await pool.query(querySelect, params);
      if (result.rows.length === 0) {
        return res.status(404).json({ mensagem: "Autor não encontrado" });
      }
      return res.status(200).json(result.rows[0]);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

module.exports = new Autores();
