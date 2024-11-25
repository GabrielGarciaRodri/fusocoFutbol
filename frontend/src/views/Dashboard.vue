<template>
    <div class="min-h-screen bg-gray-100">
      <!-- Navigation -->
      <nav class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <h1 class="text-xl font-bold">Soccer Platform</h1>
            </div>
            <div class="flex items-center">
              <span class="mr-4">{{ user.name }}</span>
              <button 
                @click="logout" 
                class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
  
      <!-- Main Content -->
      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <!-- Soccer Matches -->
          <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-2xl font-bold mb-4">Today's Matches</h2>
            <div v-if="loading" class="text-center">
              Loading matches...
            </div>
            <div v-else-if="matches.length === 0" class="text-center">
              No matches available
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div 
                v-for="match in matches" 
                :key="match.id" 
                class="border rounded p-4"
              >
                <div class="flex justify-between items-center mb-2">
                  <span>{{ match.homeTeam.name }}</span>
                  <span class="font-bold">vs</span>
                  <span>{{ match.awayTeam.name }}</span>
                </div>
                <div class="text-center text-sm text-gray-500">
                  {{ formatDate(match.utcDate) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        user: {
          name: '',
          email: ''
        },
        matches: [],
        loading: true
      }
    },
    async created() {
      await this.fetchUserData()
      await this.fetchMatches()
    },
    methods: {
      async fetchUserData() {
        try {
          const token = localStorage.getItem('token')
          const response = await axios.get('/auth/user', {
            headers: { Authorization: `Bearer ${token}` }
          })
          this.user = response.data
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      },
      async fetchMatches() {
        try {
          const response = await axios.get('/soccer/matches')
          this.matches = response.data.matches
        } catch (error) {
          console.error('Error fetching matches:', error)
        } finally {
          this.loading = false
        }
      },
      formatDate(utcDate) {
        return new Date(utcDate).toLocaleString()
      },
      logout() {
        localStorage.removeItem('token')
        this.$router.push('/')
      }
    }
  }
  </script>