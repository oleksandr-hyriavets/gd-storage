const { Schema, model } = require('mongoose')

const folderSchema = Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  readPermissions: { type: [String], required: true },
  editPermissions: { type: [String], required: true },
  deletePermissions: { type: [String], required: true },
  parent: { type: Schema.Types.ObjectId, ref: 'Folder' },
})

folderSchema.set('timestamps', true)

const Folder = model('Folder', folderSchema)

module.exports = Folder
