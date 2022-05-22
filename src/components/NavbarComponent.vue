<template>
  <div>
    <nav
      id="nav"
      class="navbar navbar-expand-sm"
      style="background-color: #202325;"
    >
      <div class="navbar-nav mr-auto">
        <router-link
          class="nav-link"
          v-bind:class="{ active: $route.name == 'Home' }"
          v-bind:to="{ name: 'Home' }"
          >Accueil</router-link
        >
        <router-link
          class="nav-link"
          v-bind:class="{ active: $route.name == 'Register' }"
          v-if="!isLoggedIn"
          v-bind:to="{ name: 'Register' }"
          >S'inscrire</router-link
        >
      </div>
      <div class="navbar-nav ml-auto">
        <b-link
          id="disconnect"
          @click="logout"
          v-if="isLoggedIn"
          class="nav-link"
        >
          Se déconnecter
        </b-link>

        <router-link
          class="nav-link"
          v-bind:class="{ active: $route.name == 'Login' }"
          v-else
          v-bind:to="{ name: 'Login' }"
        >
          Connexion
        </router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    isLoggedIn () {
      return this.$store.getters['authentication/isLoggedIn']
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('authentication/logout')
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>

<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
