<template>
  <div class="home">
    <div class="row">
      <div class="container col-4 mr-auto">
        <div class="row">
          <div class="col-12 mt-5"><ParkListComponent /></div>
        </div>
        <div class="row">
          <div class="col-12 mt-5"><TrailListComponent /></div>
        </div>
      </div>
      <div class="container col-4 mr-auto">
        <div class="row">
          <div class="col-12 mt-5"><MapComponent /></div>
        </div>
        <div class="row">
          <div class="col-12 mt-5"><LikesComponent /></div>
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
import LikesComponent from '../components/LikesComponent.vue'
export default {
  name: 'Home',
  components: {
    MapComponent,
    ParkListComponent,
    TrailListComponent,
    LikesComponent
  }
}
</script>
