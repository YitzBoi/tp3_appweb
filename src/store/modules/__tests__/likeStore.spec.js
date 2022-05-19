import likes from '@/store/modules/likes'
import { likesJsonFake } from '@/../tests/data/likesJsonFake'

import { LikeService } from '@/services/likeService'

jest.mock('@/services/likeService')

let fakeLikesList

beforeEach(() => {
  fakeLikesList = [...likesJsonFake]
  jest.clearAllMocks()
})

describe('park.js', () => {
  describe('mutations', () => {
    test('updateLikes change les infos des likes', async () => {
      const state = { likes: 420, likesList: [] }

      likes.mutations.initializeLikes(state, fakeLikesList)

      expect(state.likes).toStrictEqual(fakeLikesList.length)
      expect(state.likesList).toStrictEqual(fakeLikesList)
    })
    test('userLikeStatus change le like status', async () => {
      const state = { isLiked: false }

      likes.mutations.userLikeStatus(state, true)

      expect(state.isLiked).toBeTruthy()
    })
  })

  describe('getters', () => {
    test('nbLikes retourne le nombre de likes', async () => {
      const state = { likes: fakeLikesList.length }

      const response = likes.getters.nbLikes(state)
      expect(response).toStrictEqual(fakeLikesList.length)
    })

    test('likesList retourne la liste de likes', async () => {
      const state = { likesList: fakeLikesList }

      const response = likes.getters.likesList(state)
      expect(response).toStrictEqual(fakeLikesList)
    })

    test('isLiked retourne le status', async () => {
      const state = { isLiked: true }

      const response = likes.getters.isLiked(state)
      expect(response).toBeTruthy()
    })
  })

  describe('actions', () => {
    test('updateLikes peut etre appelee', async () => {
      const commit = jest.fn()

      await likes.actions.updateLikes({ commit }, 1)

      expect(LikeService.getTrailLikes).toHaveBeenCalled()
      expect(commit).toHaveBeenCalled()
    })

    test("updateLikes si l'api plante alors onError est vrai", async () => {
      const commit = jest.fn()
      LikeService.getTrailLikes.mockRejectedValue(new Error())

      try {
        await likes.actions.updateLikes({ commit }, 1)
      } catch (e) {}

      expect(commit).toHaveBeenCalledWith('setOnError')
    })

    test('updateIsLiked peut etre appelee', async () => {
      const commit = jest.fn()
      const state = { likes: 420, likesList: [] }

      await likes.actions.updateIsLiked({ commit, state }, 1)

      expect(LikeService.getTrailLikes).toHaveBeenCalled()
      expect(commit).toHaveBeenCalled()
    })

    test("updateIsLiked si l'api plante alors onError est vrai", async () => {
      const commit = jest.fn()
      LikeService.getTrailLikes.mockRejectedValue(new Error())

      try {
        await likes.actions.updateIsLiked({ commit }, 1)
      } catch (e) {}

      expect(commit).toHaveBeenCalledWith('setOnError')
    })
  })
})
