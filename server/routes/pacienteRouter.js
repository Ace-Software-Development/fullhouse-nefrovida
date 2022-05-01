const express = require('express')
const router = express.Router()
const pacienteController = require('../controllers/pacienteController')

router.get('/detalle', pacienteController.consutarDetallePaciente)
router.post('/', pacienteController.crearPaciente)
router.get('/', pacienteController.consultarPacientes)

module.exports = router