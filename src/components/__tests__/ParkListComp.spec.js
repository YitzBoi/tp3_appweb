import { shallowMount } from '@vue/test-utils'
import ParkListComponent from '@/components/ParkListComponent.vue'
import { parkService } from '@/services/parkService.js'
import { parksJsonFake } from '@/../tests/data/parksJsonFake.js'
import flushPromises from 'flush-promises'
import { resetAllWhenMocks } from 'jest-when'

jest.mock('@/services/parkService.js')

let parks

beforeEach(() => {
  parks = [...parksJsonFake]
  jest.clearAllMocks()
  resetAllWhenMocks()
  parkService.getAllParksOrderByName.mockResolvedValue(parks)
})

describe('ParkListComponent.vue', () => {
  test('La liste des noms de parcs doit être présente dans le select', async () => {
    const wrapper = await shallowMount(ParkListComponent, {
      mocks: {
        $store: {
          dispatch: () => {}
        }
      }
    })
    const parkNames = []
    parks.forEach(park => {
      parkNames.push(park.name)
    })

    await flushPromises()

    const parksList = wrapper
      .findAll('option')
      .wrappers.map(option => option.text())

    expect(parksList).toStrictEqual(parkNames)
  })

  test('Lorsque la page est chargé, un parc est selectionné par défaut dans le select', async () => {
    const wrapper = await shallowMount(ParkListComponent, {
      mocks: {
        $store: {
          dispatch: () => {}
        }
      }
    })

    await flushPromises()

    let initPark = wrapper.find('#parkSelector').element.value

    expect(initPark).toContain('1')
  })

  test('Lorsque la page est chargé, current park est le premier de la liste', async () => {
    const wrapper = await shallowMount(ParkListComponent, {
      mocks: {
        $store: {
          dispatch: () => {}
        }
      }
    })

    await flushPromises()

    let initPark = wrapper.vm.clickedPark

    expect(initPark).toStrictEqual(1)
  })

  test("Lorsqu'un parc est selectionné, le currentPark doit changer", async () => {
    const wrapper = await shallowMount(ParkListComponent, {
      mocks: {
        $store: {
          dispatch: () => {}
        }
      }
    })

    await flushPromises()

    wrapper.vm.changeSelectedPark(2)

    let park = wrapper.vm.clickedPark

    expect(park).toStrictEqual(2)
  })

  test("Lorsqu'un parc est selectionné, le currentPark doit être envoyé au store", async () => {
    const wrapper = await shallowMount(ParkListComponent, {
      mocks: {
        $store: {
          dispatch: () => {}
        }
      }
    })
    const storeDispatch = jest.spyOn(wrapper.vm.$store, 'dispatch')
    await flushPromises()

    wrapper.vm.changeSelectedPark(2)

    expect(storeDispatch).toHaveBeenCalled()
    expect(storeDispatch).toHaveBeenCalledWith('park/setPark', 1)
    expect(storeDispatch).toHaveBeenCalledWith('park/setPark', 2)
  })
})
