import { shallowMount } from '@vue/test-utils'
import Login from '@/views/Login.vue'
import flushPromises from 'flush-promises'
import { authService } from '../../services/authService'
import { resetAllWhenMocks, when } from 'jest-when'
import { BLink, BButton, BFormInput, BForm, BContainer } from 'bootstrap-vue'

jest.mock('@/services/authService')

const ANY_VALID_DATA = {
  email: 'email@email.com',
  password: 'password'
}

const ANY_VALID_TOKEN = 'dee2n4ts'
let store

beforeEach(() => {
  jest.clearAllMocks()
  resetAllWhenMocks()
  authService.getToken.mockResolvedValue(true)
  store = createMockStore()
})

async function loginShallowMount () {
  const wrapper = await shallowMount(Login, {
    mocks: {
      $store: store,
      $router: {
        push: () => {}
      }
    },
    stubs: {
      'b-link': BLink,
      'b-button': BButton,
      'b-form-input': BFormInput,
      'b-form': BForm,
      'b-container': BContainer
    }
  })
  return wrapper
}

function createMockStore () {
  const getPostByIdMock = jest.fn()
  when(getPostByIdMock)
    .calledWith(ANY_VALID_DATA)
    .mockReturnValue(ANY_VALID_TOKEN)

  const store = {
    state: {
      authentication: {
        authServiceError: false
      }
    },
    dispatch: jest.fn(),
    commit: jest.fn()
  }
  return store
}

describe('Login.vue', () => {
  test("se connecter doit envoyer le login et doit renvoyer sur l'accueil", async () => {
    const wrapper = await loginShallowMount()
    const pushSpy = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.setData(ANY_VALID_DATA)

    await flushPromises()

    await wrapper.find('form').trigger('submit.prevent')

    expect(pushSpy).toBeCalled()
    expect(store.dispatch).toHaveBeenCalledWith('authentication/login', {
      email: 'email@email.com',
      password: 'password'
    })
  })
})
