const fs = require('fs')
path = require('path')
const util = require('util')
const { google } = require('googleapis')
const readFile = fileName => util.promisify(fs.readFile)(fileName, 'utf8')

const credentialsPath = path.join(
  __dirname,
  './../../config/googleApi/credentials.json',
)
const tokenPath = path.join(__dirname, './../../config/googleApi/token.json')

async function getCredentials() {
  try {
    const content = await readFile(credentialsPath)

    return JSON.parse(content)
  } catch (err) {
    console.log('Error loading client secret file:', err)
  }
}

async function getToken() {
  try {
    const content = await readFile(tokenPath)

    return JSON.parse(content)
  } catch (err) {
    console.log('Error loading client secret file:', err)
  }
}

async function getAuth() {
  const credentials = await getCredentials()
  const token = await getToken()

  const { client_secret, client_id, redirect_uris } = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0],
  )

  oAuth2Client.setCredentials(token)

  return oAuth2Client
}

module.exports = getAuth
