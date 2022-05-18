import { API } from '@/shared/config'
import requestInterceptor from '@/shared/requestInterceptor'
import { parseAxiosErrorToAppError } from '@/shared/errorHelper'

async function getTrailLikes (id) {
  try {
    const { data } = await requestInterceptor.get(`${API}/trails/${id}/likes`)
    return data
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

async function postLike (like) {
  try {
    await requestInterceptor.post(`${API}/likes`, {
      userId: like.userId,
      trailId: like.trailId
    })
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

async function deleteLike (id) {
  try {
    await requestInterceptor.delete(`${API}/likes/${id}`)
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

export const LikeService = {
  getTrailLikes,
  postLike,
  deleteLike
}
