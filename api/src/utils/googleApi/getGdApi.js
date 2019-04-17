const { google } = require('googleapis')
const getAuth = require('./getAuth')

async function getGdApi() {
  const auth = await getAuth()

  return google.drive({ version: 'v3', auth })
}

module.exports = getGdApi
