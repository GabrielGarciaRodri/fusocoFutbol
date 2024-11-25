const router = require('express').Router()
const axios = require('axios')
const authMiddleware = require('../middleware/auth')

router.use(authMiddleware)

router.get('/leagues', async (req, res) => {
  try {
      const response = await axios.get('https://api-football-v1.p.rapidapi.com/v3/leagues', {
          headers: {
              'X-RapidAPI-Key': process.env.RAPID_API_KEY,
              'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
          }
      })
      res.json(response.data)
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
})

router.get('/fixtures/live', async (req, res) => {
  try {
      const response = await axios.get('https://api-football-v1.p.rapidapi.com/v3/fixtures', {
          params: { live: 'all' },
          headers: {
              'X-RapidAPI-Key': process.env.RAPID_API_KEY,
              'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
          }
      })
      res.json(response.data)
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
})

router.get('/fixtures/date/:date', async (req, res) => {
  try {
      const response = await axios.get('https://api-football-v1.p.rapidapi.com/v3/fixtures', {
          params: { date: req.params.date },
          headers: {
              'X-RapidAPI-Key': process.env.RAPID_API_KEY,
              'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
          }
      })
      res.json(response.data)
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
})

module.exports = router