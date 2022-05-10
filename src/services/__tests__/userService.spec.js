import { API } from '@/shared/config'
import requestInterceptor from '@/shared/requestInterceptor'
import { userService } from '@/services/userService'
import { userJsonFake } from '@/../tests/data/userJsonFake'
import MockAdapter from 'axios-mock-adapter'

var mockRequestInterceptor = new MockAdapter(requestInterceptor)

let users

beforeEach(() => {
  users = [...userJsonFake]

  mockRequestInterceptor.reset()
})

describe('userService.js', () => {
  test('getUserById doit retourner un utilisateur selon le ID demandé', async () => {
    const userId = 1
    mockRequestInterceptor.onGet(`${API}/users/${userId}`).reply(200, users)

    const response = await userService.getUserById(userId)
    expect(users).toEqual(response)
  })
})
