import { API } from '@/shared/config'
import requestInterceptor from '@/shared/requestInterceptor'
import 
import { parseAxiosErrorToAppError } from '@/shared/errorHelper'
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
    mockRequestInterceptor.onGet(`${API}/users`).reply(200, users)

    const response = await 
  })
})
