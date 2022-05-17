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
    let getMocked = { data: parks }
    mockRequestInterceptor.get.mockResolvedValue(getMocked)

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
    let getMocked = { data: parks[id] }
    mockRequestInterceptor.get.mockResolvedValue(getMocked)

    const response = await parkService.getParkById(id)
    expect(response).toEqual(parks[id])
  })

  test('getParkById leve une exception si une erreur survient', async () => {
    const id = 0
    mockRequestInterceptor.get.mockRejectedValueOnce()

    const response = await parkService.getParkById(id)
    expect(response).toEqual(parks)
  })
})
