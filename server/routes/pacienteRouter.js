const express = require('express')
const router = express.Router()
const {authUsuario, noAuthUsuario, authRol} = require('../rbac/Authentication')
let CONSTANTS = require("../constantsProject");
const pacienteController = require('../controllers/pacienteController')

// Ruta de tipo 'POST' para registrar un nuevo paciente.
router.post('/', 
    //authRol([CONSTANTS.ROLTRABAJOSOCIAL]),
    pacienteController.crearPaciente)

module.exports = router