import axios from 'axios'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { useLoginAPIStore } from '@/stores/login-data.js'

export const toast = useToast()

const loginData = useLoginAPIStore()
const BASE_URL = 'https://college.apipart.ir/'

export const PART_API = () => {
    const api = axios.create({
        baseURL: BASE_URL,
        timeout: 10000,
        headers: {
            'gateway-system': 'turboFront',
            'gateway-token': loginData.$state.token
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

export const getDepositAccountdata = async () => {
    try {
        const response = await PART_API().get('deposit-account')
        return response
    } catch (error) {
        throw new Error(error)
    }
}

export const getTransActionsData = async () => {
    try {
        const response = await PART_API().get('transactions')
        return response
    } catch (error) {
        throw new Error(error)
    }
}

export const exitAccount = async (id) => {
    try {
        const response = await PART_API().delete(`deposit-account/${id}`)
        return response
    } catch (error) {
        throw new Error(error)
    }
}
