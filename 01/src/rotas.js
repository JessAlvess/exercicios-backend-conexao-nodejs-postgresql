const express = require('express')
const autoresController = require('../src/controllers/autores')
const livrosController = require('../src/controllers/livros')
const rotas = express()

rotas.post('/autor', autoresController.cadastrarAutor)
rotas.get('/autor/:id', autoresController.buscarAutor)
rotas.post('/autor/:id/livro', livrosController.cadastrarLivro)
rotas.get('/livro', livrosController.buscarLivros)



module.exports = rotas