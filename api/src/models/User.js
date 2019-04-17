const { Schema, model } = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const userSchema = Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
  scopes: { type: [String], required: true },
})

userSchema.methods.setPassword = password => {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex')
}

userSchema.methods.validatePassword = password => {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex')
  return this.hash === hash
}

userSchema.methods.generateJWT = () => {
  const today = new Date()
  const expirationDate = new Date(today)
  expirationDate.setDate(today.getDate() + 60)

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    'secret',
  )
}

userSchema.methods.toAuthJSON = () => {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  }
}

const User = model('User', userSchema)

module.exports = User
