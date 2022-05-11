<template>
  <div>
    <b-container>
      <b-form @submit.prevent="register">
        <h1>Créer un compte</h1>
        <label>Courriel</label>
        <b-form-input id="email" required v-model="email" type="text" />
        <label>Nom d'utilisateur</label>
        <b-form-input id="name" required v-model="name" type="text" />

        <label>Mot de passe</label>
        <b-form-input
          id="password"
          required
          v-model="password"
          type="password"
        />
        <b-button type="submit" variant="primary" class="mt-4"
          >Créer le compte</b-button
        >
      </b-form>
      <div v-if="authServiceError">{{ authServiceError }}</div>
    </b-container>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.commit('authentication/clearError')
  },
  data () {
    return {
      email: '',
      password: '',
      name: ''
    }
  },
  methods: {
    async register () {
      await this.$store.dispatch('authentication/register', {
        email: this.email,
        password: this.password,
        name: this.name
      })
      if (!this.authServiceError) {
        this.$router.push({
          name: 'Login'
        })
      }
    }
  },
  computed: {
    authServiceError () {
      return this.$store.state.authentication.authServiceError
    }
  }
}
</script>

<style lang="scss" scoped></style>
