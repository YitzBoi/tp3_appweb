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
    const wrapper = await shallowMount(ParkListComponent)
    const parkNames = []
    parks.forEach(park => {
      parkNames.push(park.name)
    })

    await flushPromises()

    const parksList = wrapper
      .findAll('option')
      .wrappers.map(option => option.text())

    console.log(parksList)
    expect(parksList).toStrictEqual(parkNames)
  })
})
