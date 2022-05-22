<template>
  <div id="app">
    <NavbarComponent />
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue'

export default {
  name: 'App',
  components: {
    NavbarComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #141414;
}

html {
  background: #141414;
}

#nav {
  padding: 30px;
}

#nav a.nav-link {
  font-weight: bold;
  color: #246146;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

p {
  color: #42b983;
}

h1 {
  color: #42b983;
}

label {
  color: #42b983;
}
</style>
