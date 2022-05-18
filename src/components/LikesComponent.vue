<template>
  <div>
    <button class="btn btn-primary" v-if="!isLiked" @click="saveLike()">
      <b-icon icon="heart"></b-icon>
    </button>
    <button class="btn btn-primary" v-else @click="deleteLike()">
      <b-icon icon="heart-fill"></b-icon>
    </button>
    <p>{{ nbLikes }}</p>
    <p></p>
    <p></p>
  </div>
</template>

<script>
import { LikeService } from '../services/likeService'
export default {
  methods: {
    saveLike () {
      LikeService.postLike()
    },
    deleteLike () {}
  },
  computed: {
    nbLikes () {
      return LikeService.getTrailLikes(this.$store.state.trail.trailId)
    }
  }
}
</script>

<style lang="scss" scoped></style>
