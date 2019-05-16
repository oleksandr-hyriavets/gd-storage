const { getGdApi } = require('./../../utils/googleApi')

const { File } = require('./../../models')

const fs = require('fs')
const path = require('path')

async function downloadFile(req, res) {
  const {
    query: { id: fileId },
  } = req

  let file = null

  try {
    const fileFromDb = await File.findOne({ gdFileId: fileId })

    if (!fileFromDb) {
      res.status(400).send('No such file')

      return
    }

    file = fileFromDb
  } catch (err) {
    res.status(400).send('Error during downloading file')
  }

  // Get api authentificated object
  const gdApi = await getGdApi()

  const { gdFileId, filename } = file

  if (!gdFileId) {
    res.status(400).send('Please, provide google drive file id')

    return
  }

  const destPath = `./src/uploads/${filename}`
  const dest = fs.createWriteStream(destPath)

  gdApi.files.get(
    { fileId: gdFileId, alt: 'media' },
    { responseType: 'stream' },
    function(err, gRes) {
      if (err) {
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

        res.status(400).send('No such file')

        return
      }

      gRes.data
        .on('end', () => {
          res.download(destPath)

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
        })
        .on('error', err => {
          console.log('Error asdasd')
        })
        .pipe(dest)
    },
  )
  // console.log('why')
}

module.exports = downloadFile
