const express = require('express')
let CONSTANTS = require('../constantsProject');
const router = express.Router();
const parametroController = require('../controllers/parametroController');
const {authUsuario, noAuthUsuario, authRol} = require('../rbac/Authentication');

// Ruta de tipo 'GET' para obtener todos los tipos de valores
router.get('/tipoValor',
    authRol([CONSTANTS.ROLQUIMICO]),
    parametroController.consultarTiposDeValor);

module.exports = router;