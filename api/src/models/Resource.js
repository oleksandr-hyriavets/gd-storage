const { Schema, model } = require('mongoose')

const resourceSchema = Schema({
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  description: String,
  readPermissions: [String],
  editPermissions: [String],
  deletePermissions: [String],
  file: { type: Schema.Types.ObjectId, ref: 'File' },
  parend: { type: Schema.Types.ObjectId, ref: 'Resource' },
})

pageSchema.set('timestamps', true)

const Resource = model('Resource', resourceSchema)

module.exports = Resource
