import { API } from '@/shared/config'
import requestInterceptor from '@/shared/requestInterceptor'
import { parseAxiosErrorToAppError } from '@/shared/errorHelper'

async function getTrailLikes (id) {
  try {
    const { data } = await requestInterceptor.get(`${API}/trails/${id}/likes`)
    return data.length
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}
export const LikeService = {
  getTrailLikes
}
