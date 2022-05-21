import mockRequestInterceptor from '@/shared/requestInterceptor'
import { trailService } from '@/services/trailService'
import { trailJsonFake } from '@/../tests/data/trailJsonFake'
import { segmentJsonFake } from '@/../tests/data/segmentJsonFake'

jest.mock('@/shared/requestInterceptor')

let trails
let segments

beforeEach(() => {
  trails = [...trailJsonFake]
  segments = [...segmentJsonFake]
  jest.clearAllMocks()
})

describe('trailService.js', () => {
  test("getTrailById retourne le sentier attaché à l'id", async () => {
    const id = 0
    const getMocked = { data: trails[id] }
    mockRequestInterceptor.get.mockResolvedValue(getMocked)

    const response = await trailService.getTrailById(id)
    expect(response).toEqual(trails[id])
  })

  test('getTrailById leve une exception si une erreur survient', async () => {
    // Test de solidité
    const id = 0
    mockRequestInterceptor.get.mockRejectedValue(new Error())

    await expect(trailService.getTrailById(id)).rejects.toThrow()
  })

  test('getTrailsByParkId retourne le sentier attaché au parc', async () => {
    const id = 0
    const getMocked = { data: trails[id] }
    mockRequestInterceptor.get.mockResolvedValue(getMocked)

    const response = await trailService.getTrailsByParkId(id)
    expect(response).toEqual(trails[id])
  })

  test('getTrailsByParkId leve une exception si une erreur survient', async () => {
    // Test de solidité
    const id = 0
    mockRequestInterceptor.get.mockRejectedValue(new Error())

    await expect(trailService.getTrailsByParkId(id)).rejects.toThrow()
  })

  test('getAllSegments retourne les segment données par la liste', async () => {
    // Le json de segment est vide!!!!
    const listRandom = [0]
    const getMocked = { data: segments[0] }
    const listAll = []
    listAll.push(segments[0])

    mockRequestInterceptor.get.mockResolvedValue(getMocked)

    const response = await trailService.getAllSegments(listRandom)
    expect(response).toEqual(listAll)
  })

  test('getAllSegments leve une exception si une erreur survient', async () => {
    // Test de solidité
    const listRandom = [0]
    mockRequestInterceptor.get.mockRejectedValue(new Error())

    await expect(trailService.getAllSegments(listRandom)).rejects.toThrow()
  })

  test("getSegmentById retourne le segment attache a l'id", async () => {
    // Le json de segment est vide!!!!
    const getMocked = { data: segments[0] }

    mockRequestInterceptor.get.mockResolvedValue(getMocked)

    const response = await trailService.getSegmentById(0)
    expect(response).toEqual(segments[0])
  })

  test('getSegmentById leve une exception si une erreur survient', async () => {
    // Test de solidité
    const id = 0
    mockRequestInterceptor.get.mockRejectedValue(new Error())

    await expect(trailService.getSegmentById(id)).rejects.toThrow()
  })
})
