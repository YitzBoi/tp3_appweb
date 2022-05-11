import mockRequestInterceptor from '@/shared/requestInterceptor'
import { userService } from '@/services/userService'
import { userJsonFake } from '@/../tests/data/userJsonFake'

jest.mock('@/shared/requestInterceptor')

let users

beforeEach(() => {
  users = [...userJsonFake]

  jest.clearAllMocks()
})

describe('userService.js', () => {
  test('getUserById doit retourner un utilisateur selon le ID demandé', async () => {
    const userId = 0
    mockRequestInterceptor.get.mockResolvedValue(users[userId])

    const response = await userService.getUserById(userId)
    expect(response).toEqual(users[1])
  })

  test('getUserById doit lever une exception si les données de connexions entrées ne sont pas valides', async () => {
    mockRequestInterceptor.get.mockRejectedValue(new Error())

    await expect(userService.getUserById()).rejects.toThrow()
  })
})
