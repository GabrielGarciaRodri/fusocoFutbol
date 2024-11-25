const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middleware/auth')


router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/login', async (req, res) => {
  try {
      const user = await User.findOne({ email: req.body.email })
      if (!user) return res.status(400).json({ error: 'User not found' })

      const validPassword = await bcrypt.compare(req.body.password, user.password)
      if (!validPassword) return res.status(400).json({ error: 'Invalid password' })

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
      res.json({ token })
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
})

router.get('/user', authMiddleware, async (req, res) => {
  try {
      const user = await User.findById(req.user.userId).select('-password')
      res.json(user)
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
})
module.exports = router