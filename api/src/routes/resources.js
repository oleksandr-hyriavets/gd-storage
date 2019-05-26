const express = require('express')
const router = express.Router()

const multer = require('multer')

const storage = multer.diskStorage({
  destination: './../uploads',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  },
})

const upload = multer({ storage: storage })

router.get('/', require('./../controllers/resources/getResources'))
router.get(
  '/related',
  require('./../controllers/resources/getRelatedResources'),
)
router.post(
  '/create',
  upload.single('file'),
  require('./../controllers/resources/createResource'),
)
router.put(
  '/edit',
  upload.single('file'),
  require('./../controllers/resources/editResource'),
)
router.post('/remove', require('./../controllers/resources/removeResource'))

module.exports = router
