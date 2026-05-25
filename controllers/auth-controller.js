const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//registr controller
const registerUser = async (req, res) => {
  try {
    //extract user info from req body

    const { username, email, password, role } = req.body

    // check if user already exists in DB
    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }]
    })

    if (checkExistingUser) {
      return res.status(400).json({
        success: true,
        message:
          'User already exists with either same username or email. Try with different credentials.'
      })
    }

    // hash user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create new user and save in DB
    const newlyCreatedUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'user'
    })

    await newlyCreatedUser.save()

    if (newlyCreatedUser) {
      res.status(201).json({
        success: true,
        message: 'User registered successfully!!'
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Unable to register User'
      })
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: 'Something went wrong'
    })
  }
}

//login controller
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body

    // find if current user exists in DB or not
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      })
    }

    // check if password is correct or not
    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // create user token
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '30m'
      }
    )

    res.status(200).json({
      success: true,
      message: 'logged in successfully',
      accessToken
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      message: 'Something went wrong'
    })
  }
}

module.exports = { registerUser, loginUser }
