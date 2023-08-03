const express = require('express')
const  router = express.Router()
const controller = require('../controllers/infoController')

router.get('/token',controller.tokenInfo)

module.exports = router