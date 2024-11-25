const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/auth.js')
const soccerRoutes = require('./routes/soccer.js')

const app = express()

mongoose.connect('mongodb://localhost:27017/soccer_platform')

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/soccer', soccerRoutes)

app.listen(3000)