<template>
  <div>
    <img
      v-if="isLoading"
      src="@/assets/loadingWaiting.gif"
      alt="Chargement..."
      width="20"
    />
    <div v-else>
      <button class="btn btn-primary" v-if="!isLiked" @click="saveLike()">
        <b-icon icon="heart"></b-icon>
      </button>
      <button class="btn btn-primary" v-else @click="deleteLike()">
        <b-icon icon="heart-fill"></b-icon>
      </button>
    </div>
    <p>{{ nbLikes }}</p>
    <p></p>
    <p></p>
  </div>
</template>

<script>
import { LikeService } from '../services/likeService'
export default {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async saveLike () {
      if (this.isLoggedIn) {
        this.isLoading = true
        await LikeService.postLike({
          userId: this.userId,
          trailId: this.trailId
        })
        this.$store.dispatch('likes/updateLikes', this.trailId)
        this.isLoading = false
      } else {
        console.log('not logged in')
      }
    },
    async deleteLike () {
      if (this.isLoggedIn) {
        this.isLoading = true
        await this.$store.dispatch('likes/deleteLike', this.userId)
        this.$store.dispatch('likes/updateLikes', this.trailId)
        this.isLoading = false
      } else {
        console.log('not logged in')
      }
    }
  },
  created () {
    this.$store.dispatch('likes/updateIsLiked', this.userId)
  },
  computed: {
    nbLikes () {
      return this.$store.getters['likes/nbLikes']
    },
    likesList () {
      return this.$store.getters['likes/likesList']
    },
    userId () {
      if (this.isLoggedIn) {
        return Number(this.$store.getters['authentication/getTokenUserId'])
      }

      return null
    },
    trailId () {
      return this.$store.state.trail.trailId
    },
    isLoggedIn () {
      return this.$store.getters['authentication/isLoggedIn']
    },
    isLiked () {
      if (this.isLoggedIn) {
        this.$store.dispatch('likes/updateIsLiked', this.userId)
        return this.$store.getters['likes/isLiked']
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped></style>
