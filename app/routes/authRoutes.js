const express = require('express')
const  router = express.Router()
const controller = require('../controllers/authController')

router.post('/register',controller.register)
router.get('/login',controller.login)

module.exports=router