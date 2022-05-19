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
  const segmentsList = []
  let currentSeg
  await Promise.all(
    listSeg.map(async segment => {
      currentSeg = await getSegmentById(segment)
      segmentsList.push(currentSeg)
    })
  )
  return segmentsList
}

async function getSegmentById (id) {
  try {
    const { data } = await requestInterceptor.get(`${API}/segments/${id}`)
    return data
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

export const trailService = {
  getTrailsByParkId,
  getTrailById,
  getAllSegments,
  getSegmentById
}
