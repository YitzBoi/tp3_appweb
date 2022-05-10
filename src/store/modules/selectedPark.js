import { parkService } from '@/services/parkService'
// import trailsService

const state = {
  id: '',
  name: '',
  // trails: [],
  // selectedTrailName: '',
  // selectedTrailSegmentsId: [],
  // selectedTrailCoords: [],
  // selectedTrailScore: ''
  onError: false
}

const getters = {
  getPreuve: state => {
    return state.id
  }
}

const mutations = {
  initializePark (state, park) {
    state.id = park.id
    state.name = park.name
    state.onError = false
  },
  setOnError (state) {
    state.onError = true
  }
}

const actions = {
  async setPark ({ commit, state }, id) {
    try {
      console.log('yep!' + id)
      const park = await parkService.getParkById(id)
      commit('initializePark', park)
    } catch (error) {
      commit('setOnError')
    }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
