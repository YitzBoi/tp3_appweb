<template>
  <div>
    <select
      class="form-control"
      v-model="clickedPark"
      @change="changeSelectedPark(clickedPark)"
    >
      <option v-for="park in parks" v-bind:value="park.id" v-bind:key="park.id">
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
      clickedPark: ' '
    }
  },
  async created () {
    this.parks = await parkService.getAllParksOrderByName()
    this.clickedPark = this.parks[0].id
    this.changeSelectedPark(this.clickedPark)
  },
  methods: {
    changeSelectedPark (id) {
      this.$store.dispatch('park/setPark', id)
    }
  }
}
</script>

<style lang="css" scoped>
.test {
  max-height: 70px;
}
</style>
