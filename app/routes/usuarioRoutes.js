const express = require('express')
const  router = express.Router()
const controller = require('../controllers/usuarioController')

router.get('/',controller.prueba)
router.post('/create',controller.create)

module.exports=router