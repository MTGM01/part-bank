import { defineStore } from 'pinia'
import { getUserData } from '@/services/login-api'

export const useLoginAPIStore = defineStore('loginData', {
  state: () => ({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    idNumber: '',
    token: '',
    isLoading: false
  }),
  actions: {
    async setAPIData(data) {
      this.phoneNumber = data.phoneNumber
      this.password = data.password
      this.isLoading = true
      const response = await getUserData(data)
      try {
        const { firstName, idNumber, lastName, token } = response.data.data
        this.firstName = firstName
        this.lastName = lastName
        this.idNumber = idNumber
        this.token = token
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        return Promise.reject(error)
      }
    },
    resetUserData() {
      this.$reset()
      localStorage.clear()
      window.location.reload()
    },
  },
  persist: {
    enabled: true
  }
})

// TODO: change name to authentication-data
