import mockRequestInterceptor from '@/shared/requestInterceptor'
import { trailService } from '@/services/trailService'
import { trailJsonFake } from '@/../tests/data/trailJsonFake'

jest.mock('@/shared/requestInterceptor')

let trails

beforeEach(() => {
  trails = [...trailJsonFake]
  jest.clearAllMocks()
})

describe('trailService.js', () => {
  test("getTrailById retourne le sentier attaché à l'id", async () => {
    const id = 0
    let getMocked = { data: trails[id] }
    mockRequestInterceptor.get.mockResolvedValue(getMocked)

    const response = await trailService.getTrailById(id)
    expect(response).toEqual(trails[id])
  })

  test('getTrailById leve une exception si une erreur survient', async () => {
    // Test de solidité
  })

  test('getTrailsByParkId retourne le sentier attaché au parc', async () => {
    const id = 0
    let getMocked = { data: trails[id] }
    mockRequestInterceptor.get.mockResolvedValue(getMocked)

    const response = await trailService.getTrailsByParkId(id)
    expect(response).toEqual(trails[id])
  })

  test('getTrailsByParkId leve une exception si une erreur survient', async () => {
    // Test de solidité
  })

  test('getAllSegments retourne les segment données par la liste', async () => {
    // Le json de segment est vide!!!!
  })

  test('getAllSegments leve une exception si une erreur survient', async () => {
    // Test de solidité
  })

  test("getSegmentById retourne le segment attache a l'id", async () => {
    // Le json de segment est vide!!!!
  })

  test('getSegmentById leve une exception si une erreur survient', async () => {
    // Test de solidité
  })

  test('getTrailScore retourne le nombre de like attache au sentier', async () => {
    // Le json de likes est vide!!!!
  })

  test('getTrailScore leve une exception si une erreur survient', async () => {
    // Test de solidité
  })
})
