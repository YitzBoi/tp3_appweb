<template>
  <div>
    <l-map style="height: 500px" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-polyline :lat-lngs="polyline.latlngs" :color="blue"></l-polyline>
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
      center: [46.78601339822761, -71.28621784239412],
      markerLatLng: [46.78601339822761, -71.28621784239412]
    }
  }
}
</script>

<style lang="scss" scoped></style>
