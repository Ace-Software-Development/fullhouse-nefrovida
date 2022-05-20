const express = require('express');
const router = express.Router();
const {authUsuario, noAuthUsuario, authRol} = require('../rbac/Authentication');
const estudioController = require('../controllers/estudioController.js');

// Ruta de tipo 'GET' para obtener todos los parámetros de un estudio.
router.post('/', 
    estudioController.registrarResultadosEstudio);

module.exports = router;