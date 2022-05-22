import { API } from '@/shared/config'
import mockRequestInterceptor from '@/shared/requestInterceptor'
import { LikeService } from '@/services/likeService'
import { likesJsonFake } from '@/../tests/data/likesJsonFake'

jest.mock('@/shared/requestInterceptor')

let likes

beforeEach(() => {
  likes = [...likesJsonFake]
  jest.clearAllMocks()
})

describe('LikeService.js', () => {
  test('getTrailLikes retourne une liste des likes', async () => {
    const getMocked = { data: likes }
    mockRequestInterceptor.get.mockResolvedValue(getMocked)

    const response = await LikeService.getTrailLikes(1)
    expect(response).toEqual(likes)
  })

  test('getTrailLikes leve une exception si une erreur survient', async () => {
    mockRequestInterceptor.get.mockRejectedValue(new Error())

    expect(LikeService.getTrailLikes(1)).rejects.toThrow()
  })

  test('postLike peut etre appelee', async () => {
    const id = 0
    mockRequestInterceptor.post.mockResolvedValue(0)

    await LikeService.postLike(likes[id])
    expect(mockRequestInterceptor.post).toHaveBeenCalledWith(`${API}/likes`, {
      trailId: 3,
      userId: 1
    })
  })

  test('postLike leve une exception si une erreur survient', async () => {
    const id = 0
    mockRequestInterceptor.post.mockRejectedValue(new Error())

    expect(LikeService.postLike(likes[id])).rejects.toThrow()
  })

  test('deleteLike peut etre appelee', async () => {
    const id = 0
    mockRequestInterceptor.delete.mockResolvedValue(0)

    await LikeService.deleteLike(id)
    expect(mockRequestInterceptor.delete).toHaveBeenCalledWith(`${API}/likes/0`)
  })

  test('deleteLike leve une exception si une erreur survient', async () => {
    const id = 0
    mockRequestInterceptor.delete.mockRejectedValue(new Error())

    expect(LikeService.deleteLike(id)).rejects.toThrow()
  })
})
