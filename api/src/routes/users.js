const express = require('express')
const router = express.Router()
const auth = require('./../config/auth')

router.post('/register', require('./../controllers/users/createUser'))
router.post('/login', require('./../controllers/users/login'))

module.exports = router
