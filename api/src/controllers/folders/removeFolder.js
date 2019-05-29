const { Folder } = require('./../../models')

async function removeFolder(req, res) {
  const { body: id } = req

  if (!id) {
    res.status(400).send('Please, provide an folder id to delete')

    return
  }

  try {
    await Folder.deleteOne({ _id: id })

    res.send('Folder deleted successfully!')
  } catch (err) {
    res.status(400).send('Error during deleting folder')
  }
}

module.exports = removeFolder
