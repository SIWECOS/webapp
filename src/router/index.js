import Vue from 'vue'
import Router from 'vue-router'
import DomainList from '@/components/DomainList'
import DomainAdd from '@/components/DomainAdd'
import DomainVerify from '@/components/DomainVerify'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Account from '@/components/Account'
import AccountDelete from '@/components/AccountDelete'
import Logout from '@/components/Logout'
import ForgotPassword from '@/components/ForgotPassword'
import ResetPassword from '@/components/ResetPassword'
import ResendActivation from '@/components/ResendActivation'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/domains',
      name: 'Domainlist',
      component: DomainList
    },
    {
      path: '/domain/verify/:id',
      name: 'DomainVerify',
      component: DomainVerify
    },
    {
      path: '/domain/add',
      name: 'DomainAdd',
      component: DomainAdd
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/accountdelete',
      name: 'AccountDelete',
      component: AccountDelete
    },
    {
      path: '/forgotpassword',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/processreset/:token',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/resendactivation',
      name: 'ResendActivation',
      component: ResendActivation
    },
    {
      path: '/',
      redirect: Login
    }
  ]
})

export default router
