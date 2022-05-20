import likes from '@/store/modules/likes'
import { likesJsonFake } from '@/../tests/data/likesJsonFake'

import { LikeService } from '@/services/likeService'

jest.mock('@/services/likeService')

let fakeLikesList

beforeEach(() => {
  fakeLikesList = [...likesJsonFake]
  jest.clearAllMocks()
})

describe('likes.js', () => {
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

    test('updateIsLiked si le user a aimer alors userLikeStatus recevera true', async () => {
      const commit = jest.fn()
      const state = { likes: 420, likesList: fakeLikesList, isLiked: false }

      await likes.actions.updateIsLiked({ commit: commit, state: state }, 1)

      expect(commit).toHaveBeenCalledWith('userLikeStatus', true)
    })

    test("updateIsLiked si le user n'a pas aimer alors userLikeStatus recevera false", async () => {
      const commit = jest.fn()
      const state = { likes: 420, likesList: fakeLikesList, isLiked: false }

      await likes.actions.updateIsLiked({ commit: commit, state: state }, 41)

      expect(commit).toHaveBeenCalledWith('userLikeStatus', false)
    })

    test('deleteLike si le user a aimé alors supprimé', async () => {
      const commit = jest.fn()
      const state = { likes: 420, likesList: fakeLikesList, isLiked: false }

      await likes.actions.deleteLike({ commit: commit, state: state }, 1)

      expect(LikeService.deleteLike).toHaveBeenCalledWith(1)
    })

    test("deleteLike si le user n'a pas aimé alors erreur", async () => {
      const commit = jest.fn()
      const state = { likes: 420, likesList: fakeLikesList, isLiked: false }
      LikeService.deleteLike.mockRejectedValue(new Error())

      await likes.actions.deleteLike({ commit: commit, state: state }, 11223)

      expect(LikeService.deleteLike).toHaveBeenCalledWith(-10)
      expect(commit).toHaveBeenCalledWith('setOnError')
    })
  })
})
