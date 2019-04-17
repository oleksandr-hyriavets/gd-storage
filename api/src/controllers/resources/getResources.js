const { getGdApi } = require('./../../utils/googleApi')

const getResources = async (req, res) => {
  const gdApi = await getGdApi()

  gdApi.files.list(
    {
      fields: 'files(id, name)',
    },
    (err, gdRes) => {
      if (err) {
        res.send(400, 'Error during getting resources: ', err)

        return
      }

      const files = gdRes.data.files
      if (files.length) {
        res.send(files)

        return
      }
    },
  )
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
