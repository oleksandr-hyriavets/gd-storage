const express = require('express')
const router = express.Router()
const auth = require('./../config/auth')

router.post(
  '/signup',
  auth.optional,
  require('./../controllers/users/createUser'),
)

module.exports = router
