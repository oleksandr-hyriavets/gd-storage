const { User } = require('../../models')
const { SCOPE } = require('../../config/scope')

async function createUser(req, res) {
  const { body: newUser } = req
  const { password, email, fullname } = newUser

  if (!password || !email || !fullname) {
    res.send(400, 'Please enter all user data correctly')

    return
  }

  const tmpUser = await User.findOne({ email })

  if (tmpUser) {
    res.status(400).send('Email already registered')

    return
  }

  const scopes = [SCOPE.ADMIN]

  const user = new User({
    fullname,
    email,
    scopes,
    password,
  })

  try {
    await user.save()

    res.send('success')
  } catch (err) {
    res.status(400).send('Error during user creation: ', err)
  }
}

module.exports = createUser
