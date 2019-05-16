const { getGdApi } = require('./../../utils/googleApi')

const fs = require('fs')

async function downloadFile(req, res) {
  const { body: file } = req

  // Get api authentificated object
  const gdApi = await getGdApi()

  const { gdFileId, filename } = file

  if (!gdFileId) {
    res.status(400).send('Please, provide google drive file id')

    return
  }

  const dest = fs.createWriteStream(`./uploads/${filename}`)

  gdApi.files.get(
    { fileId: gdFileId, alt: 'media' },
    { responseType: 'stream' },
    function(err, res) {
      res.data
        .on('end', () => {
          console.log('Done')
        })
        .on('error', err => {
          console.log('Error', err)
        })
        .pipe(dest)
    },
  )
}

module.exports = downloadFile
