const express = require('express')
const router = express.Router()
const {authUsuario, noAuthUsuario, authRol} = require('../rbac/Authentication')
let CONSTANTS = require("../constantsProject");
const tipoEstudioController = require('../controllers/tipoEstudioController.js')

// Ruta de tipo 'GET' para obtener todos los parámetros de un estudio.
router.get('/:idTipoEstudio', 
    tipoEstudioController.consularParametrosDeEstudio);

module.exports = router;