const { Folder } = require('./../../models')

const hasPermissions = permissions => permissions && Boolean(permissions.length)

async function editFolder(req, res) {
  const { body: newFolder } = req

  if (
    !newFolder.name ||
    !newFolder.owner ||
    !hasPermissions(newFolder.readPermissions) ||
    !hasPermissions(newFolder.editPermissions) ||
    !hasPermissions(newFolder.deletePermissions)
  ) {
    res.status(400).send('Some fields is absent')

    return
  }

  try {
    await Folder.updateOne({ _id: newFolder._id }, newFolder)

    res.send('Folder edited successfully')
  } catch (err) {
    res.status(400).send('Error during editing folder')
  }
}

module.exports = editFolder
