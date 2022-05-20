import authentication from '@/store/modules/authentication'
import { authJsonFake } from '@/../tests/data/authJsonFake'

import { authService } from '@/services/authService'
import tokenHelper from '@/shared/tokenHelper'

jest.mock('@/services/authService')
jest.mock('@/shared/tokenHelper')

let authMockJson

beforeEach(() => {
  authMockJson = authJsonFake
  jest.clearAllMocks()
})

describe('Auth.js', () => {
  describe('getters', () => {
    test("isLoggedIn retourne true si le token n'est pas vide", async () => {
      const state = { token: '232232232323', authServiceError: '' }

      const reponse = authentication.getters.isLoggedIn(state)

      expect(reponse).toBeTruthy()
    })
    test('isLoggedIn retourne false si le token est vide', async () => {
      const state = { token: '', authServiceError: '' }

      const reponse = authentication.getters.isLoggedIn(state)

      expect(reponse).toBeFalsy()
    })
    test('getTokenUserId retourne le token', async () => {
      const state = { token: '232232232323', authServiceError: '' }
      tokenHelper.getUserId.mockResolvedValue('ee')

      const reponse = authentication.getters.getTokenUserId(state)

      expect(tokenHelper.getUserId).toHaveBeenCalled()
      expect(reponse).resolves.toEqual('ee')
    })
  })

  describe('mutations', () => {
    test('clearError supprime les erreurs', async () => {
      const state = { authServiceError: 'test' }

      authentication.mutations.clearError(state)

      expect(state.authServiceError).toStrictEqual('')
    })

    test('initializeAuthentication attribue un token', async () => {
      const state = { authServiceError: 'test', token: '' }

      authentication.mutations.initializeAuthentication(state, authMockJson)

      expect(state.token).toStrictEqual(authMockJson)
      expect(state.authServiceError).toStrictEqual('')
    })

    test('logout supprime le token', async () => {
      const state = { authServiceError: 'test', token: authMockJson }

      authentication.mutations.logout(state)

      expect(state.token).toStrictEqual('')
    })

    test('setAuthServiceError update l erreur le AuthServiceError', async () => {
      const state = { authServiceError: '' }

      authentication.mutations.setAuthServiceError(state, 'test')

      expect(state.authServiceError).toStrictEqual('test')
    })
  })
  describe('actions', () => {
    test('login peut etre appelee', async () => {
      const commit = jest.fn()
      authService.getToken.mockResolvedValue(authMockJson)

      await authentication.actions.login({ commit }, 1)

      expect(authService.getToken).toHaveBeenCalled()
      expect(commit).toHaveBeenCalledWith(
        'initializeAuthentication',
        authMockJson
      )
    })

    test("login si l'api plante alors setAuthServiceError est appelee", async () => {
      const commit = jest.fn()
      authService.getToken.mockRejectedValue(new Error())

      await authentication.actions.login({ commit }, 1)

      expect(authService.getToken).toHaveBeenCalled()
      expect(commit).toHaveBeenCalledWith('setAuthServiceError', '')
    })

    test('register peut etre appelee', async () => {
      const commit = jest.fn()
      authService.registerToken.mockResolvedValue(authMockJson)

      await authentication.actions.register({ commit }, 1)

      expect(authService.registerToken).toHaveBeenCalled()
      expect(commit).toHaveBeenCalledWith(
        'initializeAuthentication',
        authMockJson
      )
    })

    test("register si l'api plante alors setAuthServiceError est appelee", async () => {
      const commit = jest.fn()
      authService.registerToken.mockRejectedValue(new Error())

      await authentication.actions.register({ commit }, 1)

      expect(authService.registerToken).toHaveBeenCalled()
      expect(commit).toHaveBeenCalledWith('setAuthServiceError', '')
    })

    test('logout peut etre appelee', async () => {
      const commit = jest.fn()

      await authentication.actions.logout({ commit })

      expect(commit).toHaveBeenCalledWith('logout')
    })
  })
})
