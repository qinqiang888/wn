import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import List from '@/pages/List'
import Person from '@/pages/Person'
import Detail from '@/pages/Detail'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/List',
      name: 'List',
      component: List
    },
    {
      path: '/Person',
      name: 'Person',
      component: Person
    },
    {
      path: '/Detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
  ]
})
