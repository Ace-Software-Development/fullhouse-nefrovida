const express = require('express')
const router = express.Router()
const {authUsuario, noAuthUsuario, authRol} = require('../rbac/Authentication')
let CONSTANTS = require("../constantsProject");
const pacienteController = require('../controllers/pacienteController')

router.get('/detalle/:curp', pacienteController.consutarDetallePaciente)
router.get('/:nombre', pacienteController.consultarPorNombre)
router.get('/', pacienteController.consultarPacientes)
// Ruta de tipo 'POST' para registrar un nuevo paciente.
router.post('/', 
    //authRol([CONSTANTS.ROLTRABAJOSOCIAL]),
    pacienteController.crearPaciente)

module.exports = router