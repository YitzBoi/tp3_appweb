<template>
  <div class="home">
    <ParkListComponent />
    <MapComponent />
  </div>
</template>

<script>
import MapComponent from '../components/MapComponent.vue'
// @ is an alias to /src
import ParkListComponent from '../components/ParkListComponent.vue'
export default {
  name: 'Home',
  components: { MapComponent, ParkListComponent }
}
</script>
