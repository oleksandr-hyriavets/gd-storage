const { Resource } = require('./../../models')

async function editResource(req, res) {
  const { body: newResource } = req

  if (!newResource._id || !newResource.name || !newResource.file) {
    res.status(400).send('Some fields is absent')

    return
  }

  try {
    await Resource.updateOne({ _id: newResource._id }, newResource)

    res.send('Resource edited!')
  } catch (err) {
    res.status(400).send('Error during editing resource')
  }
}

module.exports = editResource
