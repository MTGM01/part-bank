import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { PART_API } from '@/services/api.js'

export const toast = useToast()

export const logoutUser = async () => {
  try {
    const response = await PART_API().post('/auth/logout')

    return response
  } catch (error) {
    throw new Error(error)
  }
}
