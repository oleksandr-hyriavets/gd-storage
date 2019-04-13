const express = require('express')
const router = express.Router()

router.get('/', require('./../controllers/resources/getResources'))

module.exports = router
