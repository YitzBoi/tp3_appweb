import mockRequestInterceptor from '@/shared/requestInterceptor'
import { parkService } from '@/services/parkService'
import { parksJsonFake } from '@/../tests/data/parksJsonFake'

jest.mock('@/shared/requestInterceptor')

let parks

beforeEach(() => {
  parks = [...parksJsonFake]
  jest.clearAllMocks()
})

describe('parkService.js', () => {
  test('getAllParksOrderByName retourne une liste trier des parcs', async () => {
    const getMocked = { data: parks }
    mockRequestInterceptor.get.mockResolvedValue(getMocked)

    const response = await parkService.getAllParksOrderByName()
    expect(response).toEqual(parks)
  })

  test('getAllParksOrderByName leve une exception si une erreur survient', async () => {
    mockRequestInterceptor.get.mockRejectedValue(new Error())

    expect(parkService.getAllParksOrderByName()).rejects.toThrow()
  })

  test("getParkById retourne le parc lier à l'id", async () => {
    const id = 0
    const getMocked = { data: parks[id] }
    mockRequestInterceptor.get.mockResolvedValue(getMocked)

    const response = await parkService.getParkById(id)
    expect(response).toEqual(parks[id])
  })

  test('getParkById leve une exception si une erreur survient', async () => {
    mockRequestInterceptor.get.mockRejectedValue(new Error())
    expect(parkService.getParkById(-1)).rejects.toThrow()
  })
})
