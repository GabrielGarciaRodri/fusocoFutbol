import { authApi } from '../axios'

const handleError = (error) => {
  console.error('API Error:', error.response?.data || error.message)
  throw error
}

export const auth = {
  async register(userData) {
    try {
      await authApi.post('/auth/register', userData)
    } catch (error) {
      handleError(error)
    }
  },

  async login(credentials) {
    try {
      const { data } = await authApi.post('/auth/login', credentials)
      localStorage.setItem('token', data.token)
      return data
    } catch (error) {
      handleError(error)
    }
  },

  async getUserProfile() {
    try {
      const { data } = await authApi.get('/auth/user')
      return data
    } catch (error) {
      handleError(error)
    }
  }
}