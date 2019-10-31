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
    this.setLanguage(document.querySelector('html').getAttribute('lang').substr(0, 2))
  },
  methods: {
    ...mapMutations('language', ['setLanguage'])
  }
}
</script>
