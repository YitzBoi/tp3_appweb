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

  test('se connecter ne doit pas fonctionner quand les valeurs ne sont pas valide', async () => {
    const routerPush = jest.fn()
    const wrapper = await shallowMount(Login, {
      mocks: {
        $store: {
          state: {
            authentication: {
              authServiceError: true
            }
          },
          dispatch: jest.fn(),
          commit: jest.fn(),
          $router: {
            push: () => routerPush()
          }
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

    await flushPromises()

    await wrapper.find('form').trigger('submit.prevent')

    expect(routerPush).toHaveBeenCalledTimes(0)
    expect(store.dispatch).toHaveBeenCalledTimes(0)
  })

  test('un espace texte pour entrer un email apparait', async () => {
    const wrapper = await loginShallowMount()
    wrapper.find('#email').setValue(ANY_VALID_DATA.email)

    expect(wrapper.vm.email).toBe(ANY_VALID_DATA.email)
  })

  test('un espace texte pour entrer un password apparait', async () => {
    const wrapper = await loginShallowMount()
    wrapper.find('#password').setValue(ANY_VALID_DATA.password)

    expect(wrapper.vm.password).toBe(ANY_VALID_DATA.password)
  })

  test('un espace texte pour entrer un authServiceError apparait', async () => {
    const wrapper = await loginShallowMount()

    expect(wrapper.vm.authServiceError).toBeFalsy()
  })
})
