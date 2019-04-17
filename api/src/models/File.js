const { Schema, model } = require('mongoose')

const fileSchema = Schema({
  gdFileId: { type: String, required: true },
  extension: { type: String, required: true },
})

const File = module('File', fileSchema)

module.exports = File
