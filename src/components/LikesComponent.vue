<template>
  <div>
    <img
      v-if="isLoading"
      src="@/assets/loadingWaiting.gif"
      alt="Chargement..."
      width="20"
    />
    <div v-else>
      <button id="disliked" class="btn" v-if="!isLiked" @click="saveLike()">
        <b-icon icon="heart"></b-icon>
      </button>
      <button id="liked" class="btn" v-else @click="deleteLike()">
        <b-icon icon="heart-fill"></b-icon>
      </button>
    </div>
    <p id="likes">{{ nbLikes }}</p>
    <p id="park">{{ clickedPark }}</p>
    <p id="trail">{{ trailName }}</p>
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
        const confirmed = await this.$bvModal.msgBoxConfirm(
          "Vous n'êtes pas authentifié, voulez vous vous créer un compte?",
          {
            cancelTitle: 'Non',
            okTitle: 'Oui',
            bodyBgVariant: 'dark',
            bodyTextVariant: 'success',
            footerBgVariant: 'dark',
            okVariant: 'success'
          }
        )
        if (confirmed === true) {
          this.$router.push({
            name: 'Register'
          })
        }
      }
    },
    async deleteLike () {
      if (this.isLoggedIn) {
        this.isLoading = true
        await this.$store.dispatch('likes/deleteLike', this.userId)
        this.$store.dispatch('likes/updateLikes', this.trailId)
        this.isLoading = false
      } else {
        const confirmed = await this.$bvModal.msgBoxConfirm(
          "Vous n'êtes pas authentifié, voulez vous vous créer un compte?",
          {
            cancelTitle: 'Non',
            okTitle: 'Oui',
            bodyBgVariant: 'dark',
            bodyTextVariant: 'success',
            footerBgVariant: 'dark',
            okVariant: 'success'
          }
        )
        if (confirmed === true) {
          this.$router.push({
            name: 'Register'
          })
        }
      }
    }
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
    },
    trailName () {
      return this.$store.state.trail.trailName
    },
    clickedPark () {
      return this.$store.state.park.name
    }
  }
}
</script>

<style lang="css" scoped>
#disliked {
  color: white;
  font-size: large;
}

#liked {
  color: lightgreen;
  font-size: large;
}

#disliked:hover {
  color: lightgreen;
}

#liked:hover {
  color: red;
}
</style>
