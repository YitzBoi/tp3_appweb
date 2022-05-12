import { API } from '@/shared/config'
import requestInterceptor from '@/shared/requestInterceptor'
import { parseAxiosErrorToAppError } from '@/shared/errorHelper'

async function getTrailById (id) {
  try {
    const { data } = await requestInterceptor.get(`${API}/parks/` + id)
    return data
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

export const parkService = {
  getTrailById
}
