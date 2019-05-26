const { Resource } = require('./../../models')

async function removeResource(req, res) {
  const { body: id } = req

  console.log('id', id)

  if (!id) {
    res.status(400).send('Please, provide an Resource id to delete')

    return
  }

  try {
    await Resource.deleteOne({ _id: id.id })

    res.send('Resource deleted successfully!')
  } catch (err) {
    res.status(400).send('Error during deleting Resource')
  }
}

module.exports = removeResource
