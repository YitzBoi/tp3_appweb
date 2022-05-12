<template>
  <div class="home">
    <ParkListComponent />
    <TrailListComponent />
    <MapComponent />
  </div>
</template>

<script>
import MapComponent from '../components/MapComponent.vue'
// @ is an alias to /src
import ParkListComponent from '../components/ParkListComponent.vue'
import TrailListComponent from '../components/TrailListComponent.vue'
export default {
  name: 'Home',
  components: { MapComponent, ParkListComponent, TrailListComponent }
}
</script>
