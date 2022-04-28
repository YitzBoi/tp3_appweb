import { API } from '@/shared/config'
import requestInterceptor from '@/shared/requestInterceptor'
import { parseAxiosErrorToAppError } from '@/shared/errorHelper'

async function getUserById (userId) {
  try {
    const response = await requestInterceptor.get(`${API}/users/${userId}`)
    return response.data
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

export const userService = {
  getUserById
}
