const express = require('express')
const cors = require('cors')
const connectDB = require('./config/database')
require('dotenv').config()

const app = express()
connectDB()

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/soccer', require('./routes/soccer'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))