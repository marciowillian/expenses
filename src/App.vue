<template>

  <div id="app">
    <base-spinner/>

    <div class="container-fluid" v-if="isLogged">
      <div class="row">
        <div class="col-3">
          <layout-navigation/>
        </div>
        <div class="row">
          <router-view/>
        </div>
      </div>
    </div>

    <router-view v-else/>
  </div>

</template>

<script>

import BaseSpinner from './components/global/BaseSpinner'
import LayoutNavigation from './components/layout/LayoutNavigation'

export default {
  name: 'App',
  components: {
    BaseSpinner,
    LayoutNavigation,
  },
  data: () => ({isLogged: false}),
  mounted () {
    this.$firebase.auth().onAuthStateChanged(user => {
      window.uid = user ? user.uid : null
      this.isLogged = !!user
      this.$router.push({ name: window.uid ? 'home' : 'login' }).catch(() => {})

      setTimeout(() => {
        this.$root.$emit('Spinner::hide')
      }, 300)
    })
  }
}
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  color: var(--light);
  background-color: var(--darker);
}
</style>
