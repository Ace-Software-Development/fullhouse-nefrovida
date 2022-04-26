const express = require('express')
const router = express.Router()
const controles = require('../controllers/pacienteController')

router.post('/registrar-paciente', controller.crearPaciente)

module.exports = router