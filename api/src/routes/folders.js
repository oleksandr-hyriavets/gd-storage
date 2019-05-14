const express = require('express')
const router = express.Router()

router.get('/', require('./../controllers/folders/getFolders'))
router.get('/folder', require('./../controllers/folders/getFolderById'))

router.post('/', require('./../controllers/folders/createFolder'))
router.put('/', require('./../controllers/folders/editFolder'))
router.delete('/', require('./../controllers/folders/removeFolder'))

module.exports = router
