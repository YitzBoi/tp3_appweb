import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import NavbarComponent from '@/components/NavbarComponent.vue'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('NavigationBar.vue', () => {
  test('doit contenir un lien pour se register et se login', async () => {
    const wrapper = shallowMount(NavbarComponent, {
      mocks: {
        $route: {
          name: ''
        },
        $store: {
          getters: {
            'authentication/isLoggedIn': false
          }
        }
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    const routerLinks = wrapper
      .findAllComponents(RouterLinkStub)
      .wrappers.map(routerLink => routerLink.props().to)

    expect(routerLinks).toContainEqual(
      { name: 'Home' },
      { name: 'Register' },
      { name: 'Login' }
    )
  })
})
