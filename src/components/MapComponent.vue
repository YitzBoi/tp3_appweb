<template>
  <div>
    <l-map style="height: 500px; width: auto;" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-polyline
        v-for="segment in segments"
        v-bind:key="segment.id"
        :lat-lngs="segment.coordinates"
        :color="changeDifficulty(segment.level)"
      ></l-polyline>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LPolyline } from 'vue2-leaflet'

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LPolyline
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [46.78601339822761, -71.28621784239412]
    }
  },
  computed: {
    segments () {
      return this.$store.state.trail.trailSegments
    }
  },
  methods: {
    changeDifficulty (difficulty) {
      this.changeCenter()
      switch (difficulty) {
        case 'Très Difficile':
          return 'red'
        case 'Difficile':
          return 'orange'
        case 'Intermédiaire':
          return 'blue'
        case 'Facile':
          return 'green'
        case 'Inconnue':
          return 'black'
      }
    },
    changeCenter () {
      this.center = this.$store.state.trail.trailSegments[0].coordinates[0]
    }
  }
}
</script>

<style lang="scss" scoped></style>
