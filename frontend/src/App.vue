<template>
    <div class="min-h-screen bg-gray-100">
      <nav v-if="isAuthenticated" class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex items-center">
                <router-link to="/dashboard" class="text-xl font-bold text-gray-800">
                  Soccer Platform
                </router-link>
              </div>
            </div>
            <div class="flex items-center">
              <button 
                @click="logout" 
                class="ml-4 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
  
      <main>
        <router-view></router-view>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
    computed: {
      isAuthenticated() {
        return localStorage.getItem('token') !== null
      }
    },
    methods: {
      logout() {
        localStorage.removeItem('token')
        this.$router.push('/')
      }
    }
  }
  </script>