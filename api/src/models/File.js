const { Schema, model } = require('mongoose')

const fileSchema = Schema({
  gdFileId: String,
  extension: String,
})

const File = module('File', fileSchema)

module.exports = File
