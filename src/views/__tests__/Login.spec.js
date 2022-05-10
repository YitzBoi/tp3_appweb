import { shallowMount } from '@vue/test-utils'
import Login from '@/views/Login.vue'
import flushPromises from 'flush-promises'
import { authService } from '../../services/authService'
import { resetAllWhenMocks } from 'jest-when'

jest.mock('@/services/authService')

beforeEach(() => {
  jest.clearAllMocks()
  resetAllWhenMocks()
  authService.getToken.mockResolvedValue(true)
})

// TODO: Wait for JimBoy to come back with YanBoy
describe('Login.vue', () => {
  test("se connecter doit envoyer le login et doit renvoyer sur l'accueil", async () => {
    const pushMock = jest.fn()
    const dispatchMock = jest.fn()
    const authServiceErrorMock = jest.fn()

    const wrapper = await shallowMount(Login, {
      mocks: {
        $router: {
          push: pushMock()
        },
        $store: {
          dispatch: dispatchMock()
        }
      },
      computed: {
        authServiceError: authServiceErrorMock()
      }
    })
    wrapper.setData({
      email: 'email@email.com',
      password: 'password'
    })

    await flushPromises()

    wrapper.find('b-button').trigger('click')

    expect(pushMock).toHaveBeenCalledWith({
      name: 'Home'
    })
    expect(dispatchMock).toHaveBeenCalledWith({
      email: 'email@email.com',
      password: 'password'
    })
  })
})
