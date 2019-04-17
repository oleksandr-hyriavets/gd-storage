const { User } = require('./../../models')
const { SCOPE } = require('./../../config/scope')
const encryptPassword = require('./../../utils/encryptPassword')

async function createUser(req, res) {
  const { body: newUser } = req
  const { password, email, fullname } = newUser

  if (!password || !email || !fullname) {
    res.send(400, 'Please enter all user data correctly')

    return
  }

  const scopes = [SCOPE.ADMIN]

  const [salt, hash] = encryptPassword(password)

  const user = new User({
    email,
    fullname,
    scopes,
    salt,
    hash,
  })

  try {
    await user.save()
  } catch (err) {
    res.send('Error during creating user: ', err)
  }

  res.send('User created')
}

module.exports = createUser
