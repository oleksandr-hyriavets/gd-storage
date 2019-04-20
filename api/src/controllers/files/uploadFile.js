const path = require('path')
const mime = require('mime-types')
const fs = require('fs')

const { getGdApi } = require('./../../utils/googleApi')

async function uploadFile(req, res) {
  const { file } = req

  // Validate
  if (!file) {
    res.status(400).send('File not found')
    return
  }

  // Prepare file for uploading to google drive
  const fileMetadata = {
    name: file.originalname,
  }
  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  }

  // Get api authentificated object
  const gdApi = await getGdApi()

  // Upload to google drive
  try {
    const response = await gdApi.files.create(
      {
        resource: fileMetadata,
        media,
        fields: 'id',
      },
      (err, { data }) => {
        if (err) {
          res
            .status(200)
            .send('Erorr. during uploading file to google drive', err)

          return
        }

        res.send(data.id)
      },
    )
  } catch (err) {
    res.status(400).send('Error during uploading a file')
  }

  // Clear temporary directory
  const directory = './../uploads'

  fs.readdir(directory, (err, files) => {
    if (err) throw err

    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err
      })
    }
  })
}

module.exports = uploadFile
