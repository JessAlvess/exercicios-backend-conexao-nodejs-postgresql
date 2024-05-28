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
        VALUES ($1, $2);
        `;
      const params = [nome, idade];
      await pool.query(queryInsert, params);
    
      const querySelect = `
      SELECT * FROM autores
      WHERE nome = $1 AND
      idade = $2;
      `;

      const result = await pool.query(querySelect, params);
      return res.status(201).json(result.rows[0]);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async buscarAutor (req, res) {
    const { id } = req.params

    try {
        const querySelect = `
        SELECT * FROM autores
        WHERE id = $1;
        `
        const params = [id];

        const result = await pool.query(querySelect, params);
        if (result.rows.length === 0) {
            return res.status(404).json({ mensagem: "Autor não encontrado"})
        }
        return res.status(200).json(result.rows[0])

    } catch (error) {
        return res.status(500).json({ error})
    }

  }
}

module.exports = new Autores();
