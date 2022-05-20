let CONSTANTS = require("../constantsProject");
const express = require('express');
const router = express.Router();
const {authUsuario, authRol} = require('../rbac/Authentication')

const pacienteController = require("../controllers/pacienteController");

router.get('/:id', pacienteController.consultarEstudioPaciente);

module.exports = router;