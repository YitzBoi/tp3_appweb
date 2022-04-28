import { userService } from '@/services/userService'

const state = {
  email: '',
  name: '',
  onError: false
}

const getters = {}

const mutations = {
  initializeProfile (state, profile) {
    state.email = profile.email
    state.name = profile.name
    state.onError = false
  },
  setOnError (state) {
    state.onError = true
  }
}

const actions = {
  async getProfile ({ commit, rootGetters }) {
    try {
      const userId = rootGetters['authentication/getTokenUserId']
      const profile = await userService.getUserById(userId)
      commit('initializeProfile', profile)
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
