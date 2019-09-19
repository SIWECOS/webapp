<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'App',
  mounted () {
    this.setLanguage(document.querySelector('html').getAttribute('lang'))
  },
  methods: {
    ...mapMutations('language', ['setLanguage'])
  }
}
</script>
<style lang="scss">
  @import './assets/scss/critical.scss';
  @import './assets/scss/template.scss';
</style>
