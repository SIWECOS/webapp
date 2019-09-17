import Vue from 'vue'
import Router from 'vue-router'
import TheLogin from './views/TheLogin'
import TheRegister from './views/TheRegister'
import TheForgotPassword from './views/TheForgotPassword'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: TheLogin
    },
    {
      path: '/register',
      component: TheRegister
    },
    {
      path: '/forgotpassword',
      component: TheForgotPassword
    }
  ]
})
