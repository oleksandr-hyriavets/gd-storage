const express = require('express')
const router = express.Router()

router.use('/resources', require('./resources'))
router.use('/users', require('./users'))
router.use('/files', require('./files'))

module.exports = router
