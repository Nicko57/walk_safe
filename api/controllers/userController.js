const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const validator = require("validator");

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({user_id: user._id, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {name, email, password} = req.body

  try {
    const user = await User.signup(name, email, password)

    // create a token
    const token = createToken(user._id)

    // if 'email' is changed to 'user_id: user._id', email is still passed in the response, not user_id
    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
  // get a user
  const getUser = async (req, res) => {
    const user_id = req.params

    console.log("Hello")

    try {
      const user = await User.findById(user_id)

      res.status(200).json({id: user._id})
    } catch (error) {
      res.status(404).json({error: 'This user does not exist'})
    }
  }

  // patch user information
  const updateUser = async (req, res) => {
    const user_id = req.params.id
    const password = req.body.password 
    
    if (!validator.isStrongPassword(password)) {
      res.status(400).json({error: 'Password not strong enough'})
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.findOneAndUpdate(
          {
            _id: user_id
          },
          {
            password: hashedPassword
          }
        )
        res.status(200).json({ message: "User updated successfully!"})
      } catch (error) {
        res.status(404).json({error: 'User does not exist'})
      }
    }
    
  }

  // delete user
  const deleteUser = async (req, res) => {
    const { id } = req.params;

    const user = await User.findByIdAndDelete({_id: id})

    const token = createToken(user._id)

    res.status(200).json({ message: 'OK', token: token })
  }

  
module.exports = { signupUser, loginUser, updateUser, deleteUser, getUser }