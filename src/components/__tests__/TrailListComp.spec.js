import { shallowMount } from '@vue/test-utils'
import TrailListComponent from '@/components/TrailListComponent.vue'
import { trailService } from '@/services/trailService.js'
import { trailJsonFake } from '@/../tests/data/trailJsonFake.js'
import flushPromises from 'flush-promises'
import { resetAllWhenMocks } from 'jest-when'

jest.mock('@/services/trailService.js')

let trailsAll
let trailsPark1
let trailsPark2

beforeEach(() => {
  trailsAll = [...trailJsonFake]
  trailsPark1 = []
  trailsPark1.push(trailsAll[0])
  trailsPark1.push(trailsAll[1])

  trailsPark2 = []
  trailsPark2.push(trailsAll[2])
  trailsPark2.push(trailsAll[3])

  jest.clearAllMocks()
  resetAllWhenMocks()
})

describe('TrailListComponent.vue', () => {
  test('La liste des trails doit être présente dans le select', async () => {
    const wrapper = await shallowMount(TrailListComponent, {
      mocks: {
        $store: {
          state: {
            park: {
              listTrails: trailsPark1
            }
          }
        }
      }
    })
    const trailsNames = []
    trailsPark1.forEach(trail => {
      trailsNames.push(trail.name)
    })

    await flushPromises()

    const trailsList = wrapper
      .findAll('option')
      .wrappers.map(option => option.text())

    expect(trailsList).toStrictEqual(trailsNames)
  })

  test('Lorsque la liste des trails update, alors les options changent', async () => {
    const wrapper = await shallowMount(TrailListComponent, {
      mocks: {
        $store: {
          state: {
            park: {
              listTrails: trailsPark1
            }
          }
        }
      }
    })
    const trailsNames = []
    trailsPark2.forEach(trail => {
      trailsNames.push(trail.name)
    })

    await flushPromises()
    wrapper.vm.$store.state.park.listTrails = trailsPark2
    await flushPromises()

    const trailsList = wrapper
      .findAll('option')
      .wrappers.map(option => option.text())

    expect(trailsList).toStrictEqual(trailsNames)
  })

  test("Lorsqu'une trail est selectionné, le currentTrail doit changer", async () => {
    const wrapper = await shallowMount(TrailListComponent, {
      mocks: {
        $store: {
          state: {
            park: {
              listTrails: trailsPark1
            }
          },
          dispatch: () => {}
        }
      }
    })

    await flushPromises()

    wrapper.vm.changeSelectedTrail(2)

    let trail = wrapper.vm.clickedTrail

    expect(trail).toStrictEqual(2)
  })

  test("Lorsqu'une trail est selectionné, la Trail id doit être envoyé au store", async () => {
    const wrapper = await shallowMount(TrailListComponent, {
      mocks: {
        $store: {
          dispatch: () => {},
          state: {
            park: {
              listTrails: trailsPark1
            }
          }
        }
      }
    })
    const storeDispatch = jest.spyOn(wrapper.vm.$store, 'dispatch')

    await flushPromises()

    wrapper.vm.changeSelectedTrail(2)

    expect(storeDispatch).toHaveBeenCalled()
    expect(storeDispatch).toHaveBeenCalledWith('trail/setTrail', 2)
  })
})
