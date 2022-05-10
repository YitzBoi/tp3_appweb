<template>
  <div class="home">
    <ParkListComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import ParkListComponent from '../components/ParkListComponent.vue'
export default {
  name: 'Home',
  components: { ParkListComponent }
}
</script>
