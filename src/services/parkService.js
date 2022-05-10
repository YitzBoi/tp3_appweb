import { API } from '@/shared/config'
import requestInterceptor from '@/shared/requestInterceptor'
import { parseAxiosErrorToAppError } from '@/shared/errorHelper'

async function getAllParksOrderByName () {
  try {
    const { data } = await requestInterceptor.get(`${API}/parks`)
    data.sort((a, b) => a.name - b.name)
    return data
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

async function getParkById (id) {
  try {
    const { data } = await requestInterceptor.get(`${API}/parks/` + id)
    return data
  } catch (error) {
    throw parseAxiosErrorToAppError(error)
  }
}

export const parkService = {
  getAllParksOrderByName,
  getParkById
}
