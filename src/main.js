import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App.vue'
import router from './router'
import store from './store'
import Api from './services/api'
import locales from '../i18n/locales'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, min, email } from 'vee-validate/dist/rules'

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

extend('required', {
  ...required,
  message: 'The {_field_} is required.'
})

extend('min', {
  ...min,
  params: ['min'],
  message: 'This field must be {min} characters long'
})

extend('email', {
  ...email,
  message: 'This field must be a valid email'
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
