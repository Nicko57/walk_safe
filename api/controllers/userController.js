const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({ user_id: user._id, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// signup a user
const signupUser = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const user = await User.signup(name, email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const emergencyContact = async (req, res) => {
  const { user_id, emergencyContactEmail, field } = req.body
  if (field === 'add') {
    const user = await User.findOne({ _id: user_id })
    const currentContacts = user.emergencyContacts.toArray()
    if (!currentContacts.includes(emergencyContactEmail)) {
      update = await User.findOneAndUpdate(
        { _id: user_id },
        { $push: { emergencyContacts: emergencyContactEmail } },
      )
      const token = await createToken(user_id)
      res.status(200).json({ message: 'OK', token: token })
    } else {
      res.status(400).json({
        error: 'You already have that user in your emergency contact list',
      })
    }
  }
  if (field === 'delete') {
    update = await User.findOneAndUpdate(
      { _id: user_id },
      { $pull: { emergencyContacts: emergencyContactEmail } },
    )
    const token = await createToken(user_id)
    res.status(200).json({ message: 'OK', token: token })
  } else {
    res.status(400).json({ error: 'Deleting emergency contact unsuccesful' })
  }
}

module.exports = { signupUser, loginUser, emergencyContact }
