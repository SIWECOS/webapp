<template>
  <div id="app">
    <LoadingSpinner />
    <router-view/>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import LoadingSpinner from './components/LoadingSpinner'
export default {
  name: 'App',
  components: { LoadingSpinner },
  mounted () {
    this.setLanguage(document.querySelector('html').getAttribute('lang').substr(0, 2))
  },
  methods: {
    ...mapMutations('language', ['setLanguage'])
  }
}
</script>
