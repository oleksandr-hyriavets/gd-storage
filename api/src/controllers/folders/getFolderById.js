const { Folder } = require('../../models')

async function getFolderById(req, res) {
  const {
    query: { id },
  } = req

  if (!id) {
    res.status(400).send('Please, provide id')

    return
  }

  try {
    const folder = await Folder.findById(id).populate('user')

    res.send(folder)
  } catch (err) {
    res.status(400).send('Error during fetching folder by id')
  }
}

module.exports = getFolderById
