const express = require('express')
let CONSTANTS = require('../constantsProject');
const router = express.Router()
const consultaController = require('../controllers/consultaController')
const {authUsuario, noAuthUsuario, authRol} = require('../rbac/Authentication')

// Ruta de tipo 'POST' para registrar un nuevo paciente.
router.post('/registrar', 
    authRol([CONSTANTS.ROLDOCTOR, CONSTANTS.ROLNUTRIOLOGO, CONSTANTS.ROLQUIMICO]),
    consultaController.registrarConsulta)

module.exports = router