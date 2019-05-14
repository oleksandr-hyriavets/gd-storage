const { Folder } = require('./../../models')

const hasPermissions = permissions => permissions && Boolean(permissions.length)

async function createFolder(req, res) {
  const { body: newFolder } = req

  if (
    !newFolder.name ||
    !newFolder.owner ||
    !hasPermissions(newResource.readPermissions) ||
    !hasPermissions(newResource.editPermissions) ||
    !hasPermissions(newResource.deletePermissions)
  ) {
    res.status(400).send('Some fields is absent')

    return
  }

  const folder = new Folder(newFolder)

  try {
    await folder.save()

    res.send('Folder created successfully')
  } catch (err) {
    res.status(400).send('Error during creating folder')
  }
}

module.exports = createFolder
