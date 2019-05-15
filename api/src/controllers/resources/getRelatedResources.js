const { Resource } = require('./../../models')

async function getRelatedResources(req, res) {
  const {
    query: { id },
  } = req

  if (!id) {
    res.status(400).send('No id provided')

    return
  }

  try {
    const relatedResources = await Resource.find({ folder: id }).populate(
      'file owner',
    )

    res.send(relatedResources)
  } catch (err) {
    res.status(400).send('Error during fetching related resources')
  }
}

module.exports = getRelatedResources
