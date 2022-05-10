import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './modules/authentication'
import profile from './modules/profile'
import selectedPark from './modules/selectedPark'

import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
  reducer: state => ({
    authentication: {
      token: state.authentication.token
    }
  })
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    authentication,
    profile,
    selectedPark
  },
  plugins: [vuexLocal.plugin]
})
