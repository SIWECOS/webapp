import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App.vue'
import router from './router'
import store from './store'
import Api from './services/api'
import locales from '../i18n/locales'
import { ValidationProvider, ValidationObserver, extend, configure } from 'vee-validate'
import { required, min, email, confirmed } from 'vee-validate/dist/rules'

Vue.use(VueI18n)

Vue.config.productionTip = false

Vue.prototype.$api = new Api()
Vue.prototype.$idToken = 'id_token'

const lang = document.querySelector('html').getAttribute('lang').substr(0, 2)

const i18n = new VueI18n({
  locale: lang || 'de',
  messages: locales
})

Vue.filter('required', function (value) {
  if (!value) return ''

  return `${value}*`
})

extend('required', required)
extend('min', min)
extend('email', email)
extend('confirmed', confirmed)

configure({
  // this will be used to generate messages.
  defaultMessage: (_, values) => i18n.t(`rules.${values._rule_}`, values)
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
