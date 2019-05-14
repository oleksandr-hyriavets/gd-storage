const { Folder } = require('../../models')

async function getFolders(req, res) {
  const {
    query: { id },
  } = req

  if (id) {
    try {
      const childFolders = await Folder.find({ parent: id }).populate('user')

      res.send(childFolders)
    } catch (err) {
      res.status(400).send('Error during fetching child folders')
    }

    return
  }

  try {
    const folders = await Folder.find().populate('user')

    res.send(folders)
  } catch (err) {
    res.status(400).send('Error during fetching folders')
  }
}

module.exports = getFolders
