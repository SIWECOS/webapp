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
    path: '/domain/verify/:domain',
    component: TheDomainVerify
  },
  {
    path: '/logout',
    beforeEnter (to, from, next) {
      next()

      sessionStorage.removeItem(env.ID_TOKEN)

      if (typeof window.login_announce !== 'undefined') {
        window.login_announce(null)
      }

      console.log(1)

      // window.location.href = '/login'
    }
  }
]

const router = new Router({ routes })

router.beforeEach((to, from, next) => {
  next()
  const token = sessionStorage.getItem(env.ID_TOKEN)

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
