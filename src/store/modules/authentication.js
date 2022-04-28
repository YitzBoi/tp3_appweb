import { authService } from '@/services/authService'
import tokenHelper from '@/shared/tokenHelper'

const state = {
  token: '',
  authServiceError: ''
}

const getters = {
  isLoggedIn (state) {
    return !!state.token
  },
  getTokenUserId (state) {
    const userId = tokenHelper.getUserId(state.token)
    return userId
  }
}

const mutations = {
  clearError (state) {
    state.authServiceError = ''
  },
  initializeAuthentication (state, token) {
    state.token = token
    state.authServiceError = ''
  },
  logout (state) {
    state.token = ''
  },
  setAuthServiceError (state, message) {
    state.authServiceError = message
  }
}

const actions = {
  async login ({ commit }, credential) {
    try {
      const token = await authService.getToken(credential)
      commit('initializeAuthentication', token)
    } catch (error) {
      commit('setAuthServiceError', error.message)
    }
  },
  async register ({ commit }, credential) {
    try {
      const token = await authService.registerToken(credential)
      commit('initializeAuthentication', token)
    } catch (error) {
      commit('setAuthServiceError', error.message)
    }
  },
  logout ({ commit }) {
    commit('logout')
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
