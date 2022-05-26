const express = require('express');
const router = express.Router();
const {authUsuario, noAuthUsuario, authRol} = require('../rbac/Authentication');
const estudioController = require('../controllers/estudioController.js');
let CONSTANTS = require('../constantsProject');

// Ruta de tipo 'POST' para registrar la información de un estudio
router.post('/', 
    authRol([CONSTANTS.ROLQUIMICO]),
    estudioController.registrarResultadosEstudio);

module.exports = router;