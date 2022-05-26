const express = require('express');
const router = express.Router();
const {authUsuario, noAuthUsuario, authRol} = require('../rbac/Authentication');
const tipoEstudioController = require('../controllers/tipoEstudioController.js');

// Ruta de tipo 'GET' para obtener todos los parámetros de un estudio.
router.get('/:idTipoEstudio', 
    authRol([CONSTANTS.ROLQUIMICO]),
    tipoEstudioController.consularParametrosDeEstudio);

module.exports = router;