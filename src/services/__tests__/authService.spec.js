import mockAxios from 'axios'
import { authService } from '@/services/authService'
import { authJsonFake } from '@/../tests/data/authJsonFake'

jest.mock('axios')

let auth

beforeEach(() => {
  auth = { ...authJsonFake }
  jest.clearAllMocks()
})

describe('userService.js', () => {
  test('getToken doit retourner un token', async () => {
    mockAxios.post.mockResolvedValue(auth)
    const credential = {
      email: 'email@email.com',
      password: 'password'
    }
    const response = await authService.getToken(credential)
    expect(response).toEqual(auth.data.accessToken)
  })

  test('registerToken doit retourner un token', async () => {
    mockAxios.post.mockResolvedValue(auth)
    const credential = {
      email: 'email@email.com',
      password: 'password',
      name: 'name'
    }
    const response = await authService.registerToken(credential)
    expect(response).toEqual(auth.data.accessToken)
  })

  test('GetToken doit lever une exception si les données de connexions entrées ne sont pas valides', async () => {
    const credential = {
      email: 'email@email.com',
      password: 'password'
    }
    mockAxios.post.mockRejectedValue(new Error())

    await expect(authService.getToken(credential)).rejects.toThrow()
  })
})
