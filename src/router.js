import Vue from 'vue'
import Router from 'vue-router'
import TheLogin from './views/TheLogin'
import TheRegister from './views/TheRegister'
import TheForgotPassword from './views/TheForgotPassword'
import ThePasswordReset from './views/ThePasswordReset'
import TheAccount from './views/TheAccount'
import env from '@/../env'
import TheDomains from './views/TheDomains'
import TheDomainsAdd from './views/TheDomainsAdd'
import TheDomainVerify from './views/TheDomainVerify'
import TheResendEmailActivation from './views/TheResendEmailActivation'
import Logout from './components/Logout'

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
    path: '/processreset/:token',
    name: 'processreset',
    component: ThePasswordReset
  },
  {
    path: '/account',
    component: TheAccount
  },
  {
    path: '/domains',
    component: TheDomains
  },
  {
    path: '/domain/add',
    component: TheDomainsAdd
  },
  {
    path: '/resendactivation',
    component: TheResendEmailActivation
  },
  {
    path: '/domain/verify/:domain',
    component: TheDomainVerify
  },
  {
    path: '/logout',
    component: Logout
  }
]

const router = new Router({ routes })
let token = sessionStorage.getItem(env.ID_TOKEN)
  ? sessionStorage.getItem(env.ID_TOKEN)
  : localStorage.getItem(env.ID_TOKEN) || ''

// Initial redirect to domains view if user is logged in
if (token) {
  router.push({ path: '/domains' })
}

router.beforeEach((to, from, next) => {
  const whiteList = ['/login', '/register', '/resendactivation', '/forgotpassword', '/logout']

  if (token) {
    next()
    return
  }

  if (whiteList.includes(to.path) || to.name === 'processreset') {
    next()
    return
  }

  next(false)
})

export default router
