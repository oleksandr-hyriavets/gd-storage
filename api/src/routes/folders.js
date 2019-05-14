const express = require('express')
const router = express.Router()

router.get('/', require('./../controllers/folders/getFolders'))
router.get('/folder', require('./../controllers/folders/getFolderById'))

router.post('/', require('./../controllers/folders/createFolder'))

module.exports = router
