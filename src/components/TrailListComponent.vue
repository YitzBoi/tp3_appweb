<template>
  <div>
    <div class="form-group">
      <select
        class="form-control"
        v-model="clickedTrail"
        @change="changeSelectedTrail(clickedTrail)"
        size="6"
      >
        <option
          v-for="trail in trails"
          v-bind:value="trail.id"
          v-bind:key="trail.name"
        >
          {{ trail.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      clickedTrail: ' '
    }
  },
  async created () {
    this.clickedTrail = 42
    this.changeSelectedTrail(this.clickedTrail)
  },
  methods: {
    changeSelectedTrail (id) {
      this.clickedTrail = id
      this.$store.dispatch('trail/setTrail', id)
      this.$store.dispatch('likes/updateLikes', this.clickedTrail)
    }
  },
  computed: {
    trails () {
      return this.$store.state.park.listTrails
    }
  }
}
</script>

<style lang="css" scoped></style>
