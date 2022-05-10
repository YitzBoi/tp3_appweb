<template>
  <div class="home">
    <MapComponent />
  </div>
</template>

<script>
import MapComponent from '../components/MapComponent.vue'
// @ is an alias to /src

export default {
  name: 'Home',
  components: { MapComponent }
}
</script>
