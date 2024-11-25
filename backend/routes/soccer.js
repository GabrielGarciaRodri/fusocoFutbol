const router = require('express').Router()
const axios = require('axios')

router.get('/matches', async (req, res) => {
  try {
    const response = await axios.get('https://api.football-data.org/v4/matches', {
      headers: {
        'X-Auth-Token': 'YOUR_API_KEY'
      }
    })
    res.json(response.data)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router