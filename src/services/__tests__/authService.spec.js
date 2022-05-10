import { API } from '@/shared/config'
import axios from 'axios'
import { authService } from '@/services/authService'
import { authJsonFake } from '@/../tests/data/authJsonFake'
import MockAdapter from 'axios-mock-adapter'

var mockAxios = new MockAdapter(axios)

let auth

beforeEach(() => {
  auth = [...authJsonFake]

  mockAxios.reset()
})

describe('userService.js', () => {
  test('getToken doit retourner un token', async () => {
    mockAxios.onPost(`${API}/login`).reply(201, auth)
    const credential = {
      email: 'email@email.com',
      password: 'password'
    }
    const response = await authService.getToken(credential)
    expect(auth.data).toEqual(response)
  })

  test('registerToken doit retourner un token', async () => {
    mockAxios.onPost(`${API}/register`).reply(201, auth)
    const credential = {
      email: 'email@email.com',
      password: 'password',
      name: 'name'
    }
    const response = await authService.registerToken(credential)
    expect(auth.data).toEqual(response)
  })
})
