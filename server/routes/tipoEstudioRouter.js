const express = require('express');
const router = express.Router();
const { authUsuario, noAuthUsuario, authRol } = require('../rbac/Authentication');
const tipoEstudioController = require('../controllers/tipoEstudioController.js');
let CONSTANTS = require('../constantsProject');

// Ruta de tipo 'GET' para obtener todos los parámetros de un estudio.
router.get('/id', 
    authRol([CONSTANTS.ROLQUIMICO]),
    tipoEstudioController.consultarParametrosDeEstudio);

module.exports = router;