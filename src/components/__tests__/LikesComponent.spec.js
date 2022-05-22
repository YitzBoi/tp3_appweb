import { shallowMount } from '@vue/test-utils'
import LikesComponent from '@/components/LikesComponent.vue'
import { LikeService } from '../../services/likeService'
import { likesJsonFake } from '@/../tests/data/likesJsonFake.js'
import { trailJsonFake } from '@/../tests/data/trailJsonFake.js'
import flushPromises from 'flush-promises'
import { resetAllWhenMocks } from 'jest-when'

jest.mock('@/services/likeService.js')

const msgBoxConfirm = jest.fn()
let store

let likes
let trails
const ANY_NB_LIKES = 0
const ANY_USER_ID = 1
let loggedIn
let liked

beforeEach(() => {
  jest.clearAllMocks()
  likes = [...likesJsonFake]
  trails = [...trailJsonFake]
  resetAllWhenMocks()
  store = createMockStore()
  LikeService.postLike.mockResolvedValueOnce(trails[0].id)
})

async function likeShallowMount () {
  const wrapper = await shallowMount(LikesComponent, {
    mocks: {
      $store: store,
      $bvModal: {
        msgBoxConfirm: param => msgBoxConfirm(param)
      }
    }
  })
  return wrapper
}

function createMockStore () {
  const store = {
    state: {
      park: {
        id: 1,
        name: 'E-Ruthy',
        trails: {
          countSegment: 1
        },
        userId: ANY_USER_ID
      },
      trail: {
        trailId: trails[0].id,
        trailName: trails[0].name,
        trailSegments: trails[0].segments,
        onError: false
      },
      likes: { likesList: likes, isLiked: liked, likes: ANY_NB_LIKES }
    },
    dispatch: jest.fn(),
    getters: {
      'likes/isLiked': () => {
        return liked
      },
      'authentication/isLoggedIn': loggedIn,
      'authentication/getTokenUserId': ANY_USER_ID,
      'likes/likesList': likes,
      'likes/nbLikes': ANY_NB_LIKES
    }
  }

  return store
}

describe('LikesComponent.vue', () => {
  // utilisateur non connecte ne peut pas like
  test('un utilisateur non connecté ne peut pas like une trail', async () => {
    liked = false
    loggedIn = false
    const wrapper = await likeShallowMount()

    flushPromises()

    await wrapper.find('#disliked').trigger('click')

    expect(msgBoxConfirm).toHaveBeenCalled()
  })
  // utilisateur connecte peut like
  test('un utilisateur connecté peut like une trail', async () => {
    liked = false
    loggedIn = true
    const wrapper = await likeShallowMount()
    const saveLike = jest.spyOn(wrapper.vm, 'saveLike')

    flushPromises()

    await wrapper.find('#disliked').trigger('click')

    expect(saveLike).toHaveBeenCalled()
  })
  // utilisatteur connecte peut dislike
  test('un utilisateur connecté peut dislike une trail', async () => {
    liked = true
    loggedIn = true
    const wrapper = await likeShallowMount()
    const dislike = jest.spyOn(wrapper.vm, 'deleteLike')

    flushPromises()

    await wrapper.find('#liked').trigger('click')

    expect(dislike).toHaveBeenCalled()
  })
  // nombres de likes est affiche
  test('il est possible de voir le nombre de likes', async () => {
    const wrapper = await likeShallowMount()

    flushPromises()

    const likes = await wrapper.find('#likes').element.textContent

    expect(likes).toBe(ANY_NB_LIKES.toString())
  })
  // nom trail affiche / nom park affiche
  test('il est possible de voir le nom du parc', async () => {
    const wrapper = await likeShallowMount()

    flushPromises()

    const park = await wrapper.find('#park').element.textContent

    expect(park).toBe('E-Ruthy')
  })

  test('il est possible de voir le nom de la trail', async () => {
    const wrapper = await likeShallowMount()

    flushPromises()

    const trail = await wrapper.find('#trail').element.textContent

    expect(trail).toBe(trails[0].name)
  })
})
