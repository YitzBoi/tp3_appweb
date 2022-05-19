import park from '@/store/modules/park'
import { trailJsonFake } from '@/../tests/data/trailJsonFake'
import { parksJsonFake } from '@/../tests/data/parksJsonFake'

import { trailService } from '@/services/trailService'
import { parkService } from '@/services/parkService'

jest.mock('@/services/trailService')
jest.mock('@/services/parkService')

let trailsAllList
let parksList
let trailsList

beforeEach(() => {
  trailsAllList = [...trailJsonFake]
  parksList = [...parksJsonFake]
  trailsList = []
  trailsList.push(trailsAllList[0])
  trailsList.push(trailsAllList[1])
  jest.clearAllMocks()
})

describe('park.js', () => {
  describe('mutations', () => {
    test('initializePark change les infos du parc', async () => {
      const state = { id: 420, name: 'wrong' }
      const currentPark = parksList[0]

      park.mutations.initializePark(state, currentPark)

      expect(state.id).toStrictEqual(currentPark.id)
      expect(state.name).toStrictEqual(currentPark.name)
    })
    test('changeTrails change la liste de trails', async () => {
      const state = { listTrails: [] }

      park.mutations.changeTrails(state, trailsList)

      expect(state.listTrails[0]).toStrictEqual(trailsList[0])
      expect(state.listTrails[1]).toStrictEqual(trailsList[1])
    })
  })

  describe('actions', () => {
    test('setPark peut etre appelee', async () => {
      const commit = jest.fn()

      await park.actions.setPark({ commit }, 1)

      expect(trailService.getTrailsByParkId).toHaveBeenCalled()
      expect(parkService.getParkById).toHaveBeenCalled()
      expect(commit).toHaveBeenCalled()
    })

    test("setPark si l'api plante alors onError est vrai", async () => {
      const commit = jest.fn()
      trailService.getTrailsByParkId.mockRejectedValue(new Error())

      try {
        await park.actions.setPark({ commit }, 1)
      } catch (e) {}

      expect(commit).toHaveBeenCalledWith('setOnError')
    })
  })
})
