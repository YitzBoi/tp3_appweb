import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import NavbarComponent from '@/components/NavbarComponent.vue'

jest.mock('@/views/Home.vue')

describe('NavigationBar.vue', () => {
  test('doit contenir tous les liens', async () => {
    const wrapper = shallowMount(NavbarComponent, {
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
