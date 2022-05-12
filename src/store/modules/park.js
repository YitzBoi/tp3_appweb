import { parkService } from '@/services/parkService'
import { trailService } from '@/services/trailService'

const state = {
  id: '',
  name: '',
  listTrails: [],
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
  },
  changeTrails (state, listTrails) {
    state.listTrails = listTrails
  }
}

const actions = {
  async setPark ({ commit, state }, id) {
    try {
      const park = await parkService.getParkById(id)
      const listTrails = await trailService.getTrailsByParkId(id)
      commit('initializePark', park)
      commit('changeTrails', listTrails)
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
