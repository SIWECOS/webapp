import Vue from 'vue'
import Router from 'vue-router'
import DomainList from '@/components/DomainList'
import DomainAdd from '@/components/DomainAdd'
import DomainVerify from '@/components/DomainVerify'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Account from '@/components/Account'

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
      path: '/',
      redirect: Login
    }
  ]
})

export default router
