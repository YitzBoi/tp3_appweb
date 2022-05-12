import { trailService } from '@/services/trailService'

const state = {
  // infos for current trail
  trailName: '',
  trailSegments: [],
  trailScore: 0,
  onError: false
}

const getters = {}

const mutations = {
  initializePark (state, trail, score, segments) {
    state.trailName = trail.name
    state.trailSegments = segments
    state.trailScore = score
    state.onError = false
  },
  setOnError (state) {
    state.onError = true
  }
}

const actions = {
  async setTrail ({ commit, state }, id) {
    try {
      const trail = await trailService.getTrailById(id)
      const score = await trailService.getTrailScore(id)
      const segments = await trailService.getAllSegments(id)
      commit('initializeTrail', trail, score, segments)
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
