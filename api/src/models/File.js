const { Schema, model } = require('mongoose')

const fileSchema = Schema({
  gdFileId: { type: String, required: true },
  filename: { type: String, required: true },
  extension: { type: String, required: true },
})

const File = model('File', fileSchema)

module.exports = File
