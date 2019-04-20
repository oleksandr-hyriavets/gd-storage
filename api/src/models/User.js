const { Schema, model } = require('mongoose')

const userSchema = Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  scopes: { type: [String], required: true },
})

const User = model('User', userSchema)

module.exports = User
