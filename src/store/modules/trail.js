import { trailService } from '@/services/trailService'

const state = {
  // infos for current trail
  trailName: '',
  trailSegmentsId: [],
  trailCoords: [],
  trailScore: '',
  onError: false
}

const getters = {}

const mutations = {
  initializePark (state, park) {
    state.id = trail.id
    state.name = trail.name
    state.onError = false
  },
  setOnError (state) {
    state.onError = true
  }
}

const actions = {
  async setTrail ({ commit, state }, id) {
    try {
      const trail = await parkService.getTrailById(id)
      commit('initializeTrail', trail)
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
