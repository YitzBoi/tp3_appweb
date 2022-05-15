import { API } from '@/shared/config'
import requestInterceptor from '@/shared/requestInterceptor'
import { parseAxiosErrorToAppError } from '@/shared/errorHelper'

async function getAllParksOrderByName () {
  try {
    const { data } = await requestInterceptor.get(`${API}/parks/`)
    return data.sort(function (a, b) {
      return a.name.localeCompare(b.name)
    })
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
