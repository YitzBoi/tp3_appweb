import { shallowMount } from '@vue/test-utils'
import MapComponent from '@/components/MapComponent.vue'
import { trailJsonFake } from '@/../tests/data/trailJsonFake.js'
import { segmentJsonFake } from '@/../tests/data/segmentJsonFake.js'
import flushPromises from 'flush-promises'
import { resetAllWhenMocks } from 'jest-when'

jest.mock('@/services/likeService.js')

let store

let trails
let segments

beforeEach(() => {
  jest.clearAllMocks()
  trails = [...trailJsonFake]
  segments = [...segmentJsonFake]
  resetAllWhenMocks()
  store = createMockStore()
})

async function mapShallowMount () {
  const wrapper = await shallowMount(MapComponent, {
    mocks: {
      $store: store
    }
  })
  return wrapper
}

function createMockStore () {
  const store = {
    state: {
      trail: {
        trailId: trails[0].id,
        trailName: trails[0].name,
        trailSegments: segments,
        onError: false
      }
    },
    dispatch: jest.fn()
  }

  return store
}

describe('MapComponent.vue', () => {
  test('une liste de segments est affichee', async () => {
    const wrapper = await mapShallowMount()

    await flushPromises()

    const segmentsList = wrapper.vm.segments

    expect(segmentsList).toStrictEqual(segments)
  })

  test('le milieu devrait etre la premiere coordonnee du premier segment', async () => {
    const wrapper = await mapShallowMount()

    await flushPromises()

    await wrapper.vm.changeCenter()

    const center = wrapper.vm.center

    expect(center).toStrictEqual(segments[0].coordinates[0])
  })

  test('changer de difficulte devrait retourner la bonne couleur', async () => {
    const wrapper = await mapShallowMount()

    await flushPromises()

    const color = await wrapper.vm.changeDifficulty(segments[0].level)

    expect(color).toStrictEqual('blue')
  })
})
