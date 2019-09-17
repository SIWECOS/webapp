import Vue from 'vue'
import Router from 'vue-router'
import TheLogin from './views/TheLogin'
import TheRegister from './views/TheRegister'
import TheForgotPassword from './views/TheForgotPassword'
import TheAccount from './views/TheAccount'
import env from '@/../env'

Vue.use(Router)

const routes = [
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
  },
  {
    path: '/account',
    component: TheAccount
  }
]

const router = new Router({ routes })

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem(env.ID_TOKEN)

  if (token) {
    next(true)
    return
  }

  if (to.path === '/login' || to.path === '/register') {
    next(true)
    return
  }

  next(false)
})

export default router
