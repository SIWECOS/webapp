import Vue from 'vue'
import Router from 'vue-router'
import TheLogin from './views/TheLogin'
import TheRegister from './views/TheRegister'
import TheForgotPassword from './views/TheForgotPassword'
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

router.push(token ? { path: '/domains' } : { path: '/login' })

router.beforeEach((to, from, next) => {
  next()

  if (token) {
    next()
    return
  }

  if (to.path === '/login' || to.path === '/register') {
    next()
    return
  }

  next(false)
})

export default router
