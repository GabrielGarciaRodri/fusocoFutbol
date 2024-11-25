<template>
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div class="max-w-md w-full mx-auto">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900">Soccer Platform</h2>
          <p class="mt-2 text-sm text-gray-600">
            {{ isLogin ? 'Sign in to your account' : 'Create your account' }}
          </p>
        </div>

        <div class="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div v-if="error" class="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {{ error }}
          </div>
          <form @submit.prevent="handleSubmit">
            <div v-if="!isLogin" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  v-model="form.name"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
            </div>
  
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  v-model="form.email"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
  
              <div>
                <label class="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  v-model="form.password"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
            </div>
  
            <div class="mt-6">
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                {{ isLogin ? 'Sign in' : 'Register' }}
              </button>
            </div>
          </form>
  
          <div class="mt-6 text-center">
            <button 
              @click="isLogin = !isLogin" 
              class="text-sm text-blue-600 hover:text-blue-500"
            >
              {{ isLogin ? 'Need an account? Register' : 'Already have an account? Sign in' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import { auth } from '../store/auth'
  export default {
    data() {
      return {
        isLogin: true,
        loading: false,
        error: null,
        form: {
          name: '',
          email: '',
          password: ''
        }
      }
    },
    methods: {
      async handleSubmit() {
        this.loading = true
        this.error = null
        
        try {
          if (this.isLogin) {
            await auth.login(this.form)
            this.$router.push('/dashboard')
          } else {
            await auth.register(this.form)
            this.isLogin = true
            this.form = { name: '', email: '', password: '' }
          }
        } catch (error) {
          this.error = error.response?.data?.error || 'An error occurred'
        } finally {
          this.loading = false
        }
      },
      switchMode() {
        this.isLogin = !this.isLogin
        this.error = null
        this.form = { name: '', email: '', password: '' }
      }
    }
  }
  </script>