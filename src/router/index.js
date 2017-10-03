import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Dictionary from '@/components/Dictionary'
import Account from '@/components/Account'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dictionary',
      name: 'Dictionary',
      component: Dictionary
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    }
  ]
})
