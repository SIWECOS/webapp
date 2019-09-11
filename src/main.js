import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Api from './services/api'

Vue.config.productionTip = false

Vue.prototype.$api = new Api()
Vue.prototype.$idToken = 'id_token'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
