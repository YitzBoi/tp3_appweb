import { trailService } from '@/services/trailService'
import { LikeService } from '../../services/likeService'

const state = {
  // infos for current trail
  trailName: '',
  trailSegments: [],
  trailScore: 0,
  onError: false
}

const getters = {}

const mutations = {
  initializeTrail (state, trail) {
    state.trailName = trail.name
    state.onError = false
  },
  setOnError (state) {
    state.onError = true
  },
  initializeScore (state, score) {
    state.trailScore = score
  },
  initializeSegments (state, segments) {
    state.trailSegments = segments
  }
}

const actions = {
  async setTrail ({ commit, state }, id) {
    try {
      const trail = await trailService.getTrailById(id)
      const score = await LikeService.getTrailLikes(id)
      const segments = await trailService.getAllSegments(trail.segments)
      commit('initializeTrail', trail)
      commit('initializeScore', score)
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
