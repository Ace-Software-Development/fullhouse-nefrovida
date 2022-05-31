const express = require('express')
const router = express.Router()
const {authUsuario, noAuthUsuario, authRol} = require('../rbac/Authentication')
let CONSTANTS = require('../constantsProject');
const pacienteController = require('../controllers/pacienteController')

// Ruta de tipo 'GET' para obtener los estudios de un paciente.
router.get('/estudios',
    authRol([CONSTANTS.ROLDOCTOR, CONSTANTS.ROLNUTRIOLOGO, CONSTANTS.ROLQUIMICO]),
    pacienteController.mostrarEstudiosPaciente);

// Ruta de tipo 'POST' para registrar un nuevo paciente.
router.post('/registrar', 
    authRol([CONSTANTS.ROLTRABAJOSOCIAL]),
    pacienteController.crearPaciente)

module.exports = router