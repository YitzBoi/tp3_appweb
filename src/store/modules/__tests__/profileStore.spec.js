import profile from '@/store/modules/profile'
import { userJsonFake } from '@/../tests/data/userJsonFake'

import { userService } from '@/services/userService'

jest.mock('@/services/userService')

let userMockJson

beforeEach(() => {
  userMockJson = userJsonFake
  jest.clearAllMocks()
})

describe('profile.js', () => {
  describe('mutations', () => {
    test('initializeProfile attribue les valeurs du profile', async () => {
      const state = { email: '', name: '', onError: true }

      profile.mutations.initializeProfile(state, userMockJson)

      expect(state.email).toStrictEqual(userMockJson.email)
      expect(state.name).toStrictEqual(userMockJson.name)
      expect(state.onError).toBeFalsy()
    })

    test('setOnError attribue error a true', async () => {
      const state = { onError: false }

      profile.mutations.setOnError(state)

      expect(state.onError).toBeTruthy()
    })
  })
  describe('actions', () => {
    test('getProfile peut etre appelee', async () => {
      const commit = jest.fn()
      const rootGetters = jest.fn()
      userService.getUserById.mockResolvedValue(userMockJson)

      await profile.actions.getProfile({ commit, rootGetters })

      expect(userService.getUserById).toHaveBeenCalled()
      expect(commit).toHaveBeenCalledWith('initializeProfile', userMockJson)
    })

    test("getProfile si l'api plante alors setAuthServiceError est appelee", async () => {
      const commit = jest.fn()
      const rootGetters = jest.fn()
      userService.getUserById.mockRejectedValue(new Error())

      await profile.actions.getProfile({ commit, rootGetters })

      expect(userService.getUserById).toHaveBeenCalled()
      expect(commit).toHaveBeenCalledWith('setOnError')
    })
  })
})
