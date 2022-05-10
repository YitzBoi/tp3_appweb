<template>
  <div>
    <select
      v-model="clickedPark"
      @change="changeSelectedPark(clickedPark)"
      text="Button text via Prop"
    >
      <option
        v-for="park in parks"
        v-bind:value="park.id"
        v-bind:key="park.name"
      >
        {{ park.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { parkService } from '../services/parkService.js'
export default {
  data () {
    return {
      parks: [],
      clickedPark: ''
    }
  },
  async created () {
    this.parks = await parkService.getAllParksOrderByName()
    this.clickedPark = this.parks[0].name
  },
  methods: {
    changeSelectedPark (id) {
      this.$store.dispatch('selectedPark/setPark', id)
    }
  }
}
</script>

<style lang="css" scoped>
.test {
  max-height: 70px;
}
</style>
