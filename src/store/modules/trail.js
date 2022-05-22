import { trailService } from '@/services/trailService'

const state = {
  trailId: 0,
  trailName: '',
  trailSegments: [],
  onError: false
}

const getters = {}

const mutations = {
  initializeTrail (state, trail) {
    state.trailId = trail.id
    state.trailName = trail.name
    state.onError = false
  },
  setOnError (state) {
    state.onError = true
  },
  initializeSegments (state, segments) {
    state.trailSegments = segments
  }
}

const actions = {
  async setTrail ({ commit }, id) {
    try {
      const trail = await trailService.getTrailById(id)
      const segments = await trailService.getAllSegments(trail.segments)
      commit('initializeTrail', trail)
      commit('initializeSegments', segments)
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
