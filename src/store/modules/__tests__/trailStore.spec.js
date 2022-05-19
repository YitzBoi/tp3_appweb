import trail from '@/store/modules/trail'
import { trailJsonFake } from '@/../tests/data/trailJsonFake'
import { segmentJsonFake } from '@/../tests/data/segmentJsonFake'

import { trailService } from '@/services/trailService'

jest.mock('@/services/trailService')

let trailsAllList
let trailsList
let fakeSegments

beforeEach(() => {
  trailsList = []
  trailsAllList = [...trailJsonFake]
  trailsList.push(trailsAllList[0])
  trailsList.push(trailsAllList[1])
  fakeSegments = [...segmentJsonFake]
  jest.clearAllMocks()
})

describe('trail.js', () => {
  describe('mutations', () => {
    test('initializeTrail change les infos de la trail', async () => {
      const state = { trailId: 420, trailName: 'wrong' }
      const trailFake = trailsList[0]

      trail.mutations.initializeTrail(state, trailFake)

      expect(state.trailId).toStrictEqual(trailFake.id)
      expect(state.trailName).toStrictEqual(trailFake.name)
    })
    test('changeTrails change la liste de segments', async () => {
      const state = { trailSegments: [] }

      trail.mutations.initializeSegments(state, fakeSegments)

      expect(state.trailSegments[0]).toStrictEqual(fakeSegments[0])
      expect(state.trailSegments[1]).toStrictEqual(fakeSegments[1])
    })
  })

  describe('actions', () => {
    test('setTrail peut etre appelee', async () => {
      const commit = jest.fn()
      const trailFake = trailsList[0]
      trailService.getTrailById.mockResolvedValue(trailFake)
      trailService.getAllSegments.mockResolvedValue(fakeSegments)

      await trail.actions.setTrail({ commit }, 1)

      expect(trailService.getTrailById).toHaveBeenCalled()
      expect(trailService.getAllSegments).toHaveBeenCalled()
      expect(commit).toHaveBeenCalled()
    })

    test("setTrail si l'api plante alors onError est vrai", async () => {
      const commit = jest.fn()
      trailService.getAllSegments.mockRejectedValue(new Error())

      try {
        await trail.actions.setTrail({ commit }, 1)
      } catch (e) {}

      expect(commit).toHaveBeenCalledWith('setOnError')
    })
  })
})
