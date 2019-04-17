const express = require('express')
const router = express.Router()

router.get('/', require('./../controllers/resources/getResources'))
router.get('/create', require('./../controllers/resources/createResource'))

module.exports = router
