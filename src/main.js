import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App.vue'
import router from './router'
import store from './store'
import Api from './services/api'
import locales from '../i18n/locales'

Vue.use(VueI18n)

Vue.config.productionTip = false

Vue.prototype.$api = new Api()
Vue.prototype.$idToken = 'id_token'

const i18n = new VueI18n({
  locale: 'en',
  messages: locales
})

Vue.filter('required', function (value) {
  if (!value) return ''

  return `${value}*`
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
