import { useLoginAPIStore } from '@/stores/login-data'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const loginData = useLoginAPIStore()
const toast = useToast()
const BASE_URL = 'https://college.apipart.ir/'

export const PART_API = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      'gateway-token': loginData.$state.token,
      'gateway-system': 'turboFront'
    }
  })

  api.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      toast.error(error)
      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    (res) => {
      return res.data
    },
    (error) => {
      toast.error(error)
      return Promise.reject(error)
    }
  )
  return api
}

export const postAccountDepositData = async (data) => {
  try {
    const response = await PART_API().post('deposit-account', data)
    toast.success('افتتاح حساب با موفقیت انجام شد')
    return response
  } catch (error) {
    toast.error('دوباره تلاش کنید')
    throw new Error(error)
  }
}
