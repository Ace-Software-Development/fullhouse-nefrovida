const express = require('express')
const router = express.Router()
const tipoEstudio = require('../controllers/tipoEstudioController')

router.get('/:id', tipoEstudio.consultarTipoEstudio)

module.exports = router