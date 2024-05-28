const express = require('express')
const autoresController = require('../src/controllers/autores')
const rotas = express()

rotas.post('/autor', autoresController.cadastrarAutor)
rotas.get('/autor/:id', autoresController.buscarAutor)


module.exports = rotas