<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 px-4">
      <!-- Live Matches -->
      <div class="bg-white shadow rounded-lg p-6 mb-6">
        <h2 class="text-2xl font-bold mb-4">Live Matches</h2>
        <div v-if="loadingLive" class="text-center">Loading...</div>
        <div v-else-if="liveMatches.length === 0" class="text-center">No live matches</div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="match in liveMatches" :key="match.fixture.id" 
               class="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div class="flex justify-between items-center mb-2">
              <div class="flex flex-col items-center w-2/5">
                <img :src="match.teams.home.logo" class="w-8 h-8 mb-1" :alt="match.teams.home.name">
                <span class="text-sm text-center">{{ match.teams.home.name }}</span>
              </div>
              <div class="flex flex-col items-center w-1/5">
                <span class="text-xl font-bold">{{ match.goals.home }} - {{ match.goals.away }}</span>
                <span class="text-xs text-red-600">'{{ match.fixture.status.elapsed }}</span>
              </div>
              <div class="flex flex-col items-center w-2/5">
                <img :src="match.teams.away.logo" class="w-8 h-8 mb-1" :alt="match.teams.away.name">
                <span class="text-sm text-center">{{ match.teams.away.name }}</span>
              </div>
            </div>
            <div class="text-xs text-gray-500 text-center">
              {{ match.league.name }} - {{ match.league.round }}
            </div>
          </div>
        </div>
      </div>

      <!-- Today's Matches -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-2xl font-bold mb-4">Today's Matches</h2>
        <div v-if="loadingToday" class="text-center">Loading...</div>
        <div v-else-if="todayMatches.length === 0" class="text-center">No matches today</div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="match in todayMatches" :key="match.fixture.id" 
               class="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div class="flex justify-between items-center mb-2">
              <div class="flex flex-col items-center w-2/5">
                <img :src="match.teams.home.logo" class="w-8 h-8 mb-1" :alt="match.teams.home.name">
                <span class="text-sm text-center">{{ match.teams.home.name }}</span>
              </div>
              <div class="flex flex-col items-center w-1/5">
                <span class="text-sm">{{ formatTime(match.fixture.date) }}</span>
              </div>
              <div class="flex flex-col items-center w-2/5">
                <img :src="match.teams.away.logo" class="w-8 h-8 mb-1" :alt="match.teams.away.name">
                <span class="text-sm text-center">{{ match.teams.away.name }}</span>
              </div>
            </div>
            <div class="text-xs text-gray-500 text-center">
              {{ match.league.name }} - {{ match.league.round }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { soccerApi } from '../axios'

export default {
  data() {
    return {
      liveMatches: [],
      todayMatches: [],
      loadingLive: true,
      loadingToday: true,
      error: null
    }
  },
  
  async created() {
    await this.fetchLiveMatches()
    await this.fetchTodayMatches()
  },

  methods: {
    async fetchLiveMatches() {
      try {
        const response = await soccerApi.get('/api/soccer/fixtures/live')
        this.liveMatches = response.data.response
      } catch (error) {
        this.error = 'Error loading live matches'
      } finally {
        this.loadingLive = false
      }
    },

    async fetchTodayMatches() {
      try {
        const today = new Date().toISOString().split('T')[0]
        const response = await soccerApi.get(`/api/soccer/fixtures/date/${today}`)
        this.todayMatches = response.data.response
      } catch (error) {
        this.error = 'Error loading today\'s matches'
      } finally {
        this.loadingToday = false
      }
    },

    formatTime(dateString) {
      return new Date(dateString).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }
  }
}
</script>