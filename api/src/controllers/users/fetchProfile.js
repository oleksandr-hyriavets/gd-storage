const { User } = require('../../models')

async function fetchProfile(req, res) {
  const { body: userId } = req

  if (!userId) {
    res.status(400).send('Please, provide userId')

    return
  }

  try {
    const user = User.find({ _id: userId })

    if (!user) {
      res.status(400).send('There no user with provided id')
    } else {
      res.send(user)
    }
  } catch (err) {
    res.status(400).send('Error during fetching user profile')
  }
}

module.exports = fetchProfile
