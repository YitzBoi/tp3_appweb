import { parkService } from '@/services/parkService'

const state = {
  id: '',
  name: '',
  trails: [],
  onError: false
}

const getters = {}

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
