<template>
  <div class="home">
    <div class="row">
      <div class="container col-6">
        <div class="row">
          <div class="col-12"><ParkListComponent /></div>
        </div>
        <div class="row">
          <div class="col-12"><TrailListComponent /></div>
        </div>
      </div>
      <div class="container col-6">
        <div class="row">
          <div class="col-12"><MapComponent /></div>
        </div>
      </div>
    </div>
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
