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

async function postLike (like) {
  try {
    const response = await requestInterceptor.post(`${API}/likes`, {
      userId: like.userId,
      trailId: like.trailId
    })
    const token = response.data.accessToken
    return token
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

/*
async function deleteLikeByUserId (userId) {
  try {
    const response = await requestInterceptor.delete(`${API}/register`, {
      userId: like.userId,
      trailId: like.trailId,
      id: like.id
    })
    const token = response.data.accessToken
    return token
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}
*/

export const LikeService = {
  getTrailLikes,
  postLike
}
