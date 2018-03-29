// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
import router from './router'
import validator from './validator'
import VueClipboard from 'vue-clipboard2'

require('es6-promise').polyfill()

Vue.use(validator, {
  locale: 'de'
})

Vue.use(VueClipboard)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  i18n
})
