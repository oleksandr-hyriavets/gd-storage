const { Schema, model } = require('mongoose')

const resourceSchema = Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  description: String,
  readPermissions: { type: [String], required: true },
  editPermissions: { type: [String], required: true },
  deletePermissions: { type: [String], required: true },
  file: { type: Schema.Types.ObjectId, ref: 'File', required: true },
  parent: { type: Schema.Types.ObjectId, ref: 'Resource' },
})

resourceSchema.set('timestamps', true)

const Resource = model('Resource', resourceSchema)

module.exports = Resource
