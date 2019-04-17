const fs = require('fs')
const path = require('path')
const { getGdApi } = require('../../utils/googleApi')

const createResource = async (req, res) => {
  const gdApi = await getGdApi()

  const fileId = '1sLqCAlutnHoVCKZKM9wTWcQAitXR8V9v'
  const dest = fs.createWriteStream('tmpStorage/tmp')

  gdApi.files.get(
    { fileId: fileId, alt: 'media' },
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

  res.send('Done')
}

module.exports = createResource
