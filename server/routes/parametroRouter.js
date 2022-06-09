const express = require('express')
let CONSTANTS = require('../constantsProject');
const router = express.Router()
const parametroController = require('../controllers/parametroController')
const {authUsuario, noAuthUsuario, authRol} = require('../rbac/Authentication')

// Ruta de tipo 'GET' para obtener todos los parámetros.
router.get('/todos',
    authRol([CONSTANTS.ROLQUIMICO]),
    parametroController.consultarParametros)
module.exports = router