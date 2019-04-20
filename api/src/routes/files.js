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

router.post(
  '/upload',
  upload.single('file'),
  require('./../controllers/files/uploadFile'),
)

module.exports = router
