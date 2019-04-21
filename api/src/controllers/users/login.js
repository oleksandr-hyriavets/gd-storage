const { User } = require('../../models')

async function login(req, res) {
  const {
    body: { email, password },
  } = req

  if (!email || !password) {
    res.status(400).send('Credentials absent')

    return
  }

  const user = await User.findOne({ email, password })

  if (!user) {
    res.status(401).send('Credentials wrong')

    return
  }

  res.send(user._id)
}

module.exports = login
