<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container">
        <ul class="nav navbar-nav">
          <li v-if="!user.authenticated"><router-link to="/login">{{ $t('messages.nav.login') }}</router-link></li>
          <li v-if="user.authenticated"><router-link to="/domains">{{ $t('messages.nav.domains') }}</router-link></li>
          <li v-if="!user.authenticated"><router-link to="/register">{{ $t('messages.nav.register') }}</router-link></li>
          <li v-if="user.authenticated" ><a href="#" @click="logout()">{{ $t('messages.nav.logout') }}</a></li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import auth from './services/auth.js'

export default {
  name: 'app',
  data () {
    return {
      user: auth.user
    }
  },
  methods: {
    logout () {
      auth.logout()
    }
  },
  created: function () {
    auth.checkRememberStatus()
  }
}
</script>

<style>

</style>
