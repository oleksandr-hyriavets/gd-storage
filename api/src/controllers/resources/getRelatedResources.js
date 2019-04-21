const { Resource } = require('./../../models')

function getRelatedResources(req, res) {
  const { query: { id } } = req

  if (!id) {
    res.status(400).send('No id provided')

    return
  }

  try {
    const relatedResources = await Resource.find({ parent: id })

    res.send(relatedResources)
  } catch (err) {
    res.status(400).send('Error during fetching related resources')
  }
}

module.exports = getRelatedResources