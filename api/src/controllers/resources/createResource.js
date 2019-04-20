const fs = require('fs')
const path = require('path')
const { getGdApi } = require('../../utils/googleApi')

// name: { type: String, required: true },
// owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// description: String,
// readPermissions: { type: [String], required: true },
// editPermissions: { type: [String], required: true },
// deletePermissions: { type: [String], required: true },
// file: { type: Schema.Types.ObjectId, ref: 'File', required: true },
// parent: { type: Schema.Types.ObjectId, ref: 'Resource' },

const hasPermissions = permissions => permissions && permissions.length

const createResource = async (req, res) => {
  const { body: newResource } = req

  // Validate
  // if (
  //   !newResource.name ||
  //   !newResource.owner ||
  //   !hasPermissions(readPermissions) ||
  //   !hasPermissions(editPermissions) ||
  //   !hasPermissions(deletePermissions) ||
  //   !file
  // ) {
  //   res.status(400).send('Some fields not filled')

  //   return
  // }
  console.log(req)

  res.send(req.File)

  // const gdApi = await getGdApi()
  // const fileId = '1sLqCAlutnHoVCKZKM9wTWcQAitXR8V9v'
  // const dest = fs.createWriteStream('tmpStorage/tmp')
  // gdApi.files.get(
  //   { fileId: fileId, alt: 'media' },
  //   { responseType: 'stream' },
  //   function(err, res) {
  //     res.data
  //       .on('end', () => {
  //         console.log('Done')
  //       })
  //       .on('error', err => {
  //         console.log('Error', err)
  //       })
  //       .pipe(dest)
  //   },
  // )
  // res.send('Done')
}

module.exports = createResource
