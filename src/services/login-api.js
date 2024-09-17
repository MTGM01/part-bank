import axios from 'axios'
import { useToast } from 'vue-toast-notification'

const toast = useToast()
const BASE_URL = 'https://college.apipart.ir/'

const headers = {
  'gateway-system': 'turboFront'
}

const PART_API = axios.create({ baseURL: BASE_URL, timeout: 50000 })

export const getUserData = async (data) => {
  try {
    const response = await PART_API.post('/auth/login', data, {
      headers: headers
    })
    return response
  } catch (error) {
    toast.error('رمز عبور یا شماره همراه وارد شده اشتباه است')
  }
}