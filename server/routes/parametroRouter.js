const express = require('express')
let CONSTANTS = require('../constantsProject');
const router = express.Router();
const parametroController = require('../controllers/parametroController');
const {authUsuario, noAuthUsuario, authRol} = require('../rbac/Authentication');

// Ruta de tipo 'GET' para obtener todos los tipos de valores
router.get('/tipoValor',
    authRol([CONSTANTS.ROLQUIMICO]),
    parametroController.consultarTiposDeValor);

// Ruta de tipo 'POST' para registrar un nuevo parámetro
router.post('/registrar',
    authRol([CONSTANTS.ROLQUIMICO]),
    parametroController.registrarParametro);


// Ruta de tipo 'GET' para obtener todos los parámetros.
router.get('/todos',
    authRol([CONSTANTS.ROLQUIMICO]),
    parametroController.consultarParametros)
module.exports = router