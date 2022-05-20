import { LikeService } from '../../services/likeService'

const state = {
  likesList: [],
  isLiked: false,
  likes: 0
}
const getters = {
  nbLikes (state) {
    return state.likes
  },
  likesList (state) {
    return state.likesList
  },
  isLiked (state) {
    return state.isLiked
  }
}

const mutations = {
  initializeLikes (state, likes) {
    state.likes = likes.length
    state.likesList = likes
  },
  setOnError (state) {
    state.onError = true
  },
  userLikeStatus (state, isLiked) {
    state.isLiked = isLiked
  }
}
const actions = {
  async updateLikes ({ commit }, id) {
    try {
      const likes = await LikeService.getTrailLikes(id)
      commit('initializeLikes', likes)
    } catch (error) {
      commit('setOnError')
    }
  },
  async updateIsLiked ({ commit, state }, userId) {
    try {
      let hasBeenLiked = false
      state.likesList.forEach(like => {
        if (like.userId === userId) {
          hasBeenLiked = true
        }
      })
      if (hasBeenLiked) commit('userLikeStatus', true)
      else commit('userLikeStatus', false)
    } catch (error) {
      commit('setOnError')
    }
  },
  async deleteLike ({ commit, state }, userId) {
    try {
      let likeId = -10
      state.likesList.forEach(like => {
        if (like.userId === userId) {
          likeId = like.id
        }
      })
      await LikeService.deleteLike(likeId)
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
