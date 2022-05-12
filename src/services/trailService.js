import { API } from '@/shared/config'
import requestInterceptor from '@/shared/requestInterceptor'
import { parseAxiosErrorToAppError } from '@/shared/errorHelper'

async function getTrailById (id) {
  try {
    const { data } = await requestInterceptor.get(`${API}/trails/${id}`)
    return data
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

async function getTrailsByParkId (id) {
  try {
    const { data } = await requestInterceptor.get(`${API}/parks/${id}/trails`)
    return data
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

async function getAllSegments (listSeg) {
  const liste = []
  /* try {
    const { data } = await requestInterceptor.get(
      `${API}/trails/${id}/segments/`
    )
    return data
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  } */
  listSeg.forEach(async element => {
    liste.push(await getSegmentById(element))
  })
  return liste
}

async function getSegmentById (id) {
  try {
    const { data } = await requestInterceptor.get(`${API}/segments/${id}`)
    return data
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

async function getTrailScore (id) {
  try {
    const { data } = await requestInterceptor.get(`${API}/trails/${id}/likes`)
    return data.length
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

export const trailService = {
  getTrailsByParkId,
  getTrailById,
  getAllSegments,
  getTrailScore
}
