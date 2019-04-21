const { getGdApi } = require('./../../utils/googleApi')

const { Resource } = require('./../../models')

const getResources = async (req, res) => {
  const {
    req: {
      query: { id },
    },
  } = req

  if (id) {
    try {
      const resource = await Resource.findById(id).populate('file owner')

      res.send(resource)
    } catch (err) {
      res.status(400).send('Error during fetching resource by id')
    }

    return
  }

  try {
    const resources = await Resource.find().populate('file owner')

    res.send(resources)
  } catch (err) {
    res.status(400).send('Error during getting resources')
  }
  // const gdApi = await getGdApi()
  // gdApi.files.list(
  //   {
  //     fields: 'files(id, name)',
  //   },
  //   (err, gdRes) => {
  //     if (err) {
  //       res.send(400, 'Error during getting resources: ', err)
  //       return
  //     }
  //     const files = gdRes.data.files
  //     if (files.length) {
  //       res.send(files)
  //       return
  //     }
  //   },
  // )
  // const ress = await gdApi.files.create({
  //   requestBody: {
  //     name: 'Test',
  //     mimeType: 'text/plain',
  //   },
  //   media: {
  //     mimeType: 'text/plain',
  //     body: 'Hello World',
  //   },
  // })
}

module.exports = getResources
