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
    mockRequestInterceptor.get.mockResolvedValue(parks)

    const response = await parkService.getAllParksOrderByName()
    expect(response).toEqual(parks)
  })

  test('getAllParksOrderByName leve une exception si une erreur survient', async () => {
    mockRequestInterceptor.get.mockRejectedValueOnce()

    const response = await parkService.getAllParksOrderByName()
    expect(response).toEqual(parks)
  })

  test("getParkById retourne le parc lier à l'id", async () => {
    const id = 0
    mockRequestInterceptor.get.mockResolvedValue(parks[id])

    const response = await parkService.getAllParksOrderByName(id)
    expect(response).toEqual(parks)
  })
})
