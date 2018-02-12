import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import List from '@/pages/List'
import Person from '@/pages/Person'
import Detail from '@/pages/Detail'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Course from '@/pages/Course'
import Order from '@/pages/Order'
import PerfectInfo from '@/pages/PerfectInfo'
import Chat from '@/pages/Chat'
import Certification from '@/pages/Certification'
import OrderList from '@/pages/OrderList'
import OrderDetail from '@/pages/OrderDetail'
import BackInfo from '@/pages/BackInfo'
import AboutMe from '@/pages/AboutMe'
import Accout from '@/pages/Accout'
import PayType from '@/pages/PayType'
import RegisterTeach from '@/pages/RegisterTeach'
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
      path: '/Detail/:id',
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
    },
    {
      path: '/Course/:id',
      name: 'Course',
      component: Course
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order
    },
    {
      path: '/PerfectInfo',
      name: 'PerfectInfo',
      component: PerfectInfo
    },
    {
      path: '/Certification',
      name: 'Certification',
      component: Certification
    },
    {
      path: '/Chat',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/OrderList',
      name: 'OrderList',
      component: OrderList
    },
    {
      path: '/OrderDetail',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/BackInfo',
      name: 'BackInfo',
      component: BackInfo
    },
    {
      path: '/AboutMe',
      name: 'AboutMe',
      component: AboutMe
    },
    {
      path: '/Accout',
      name: 'Accout',
      component: Accout
    },
    {
      path: '/PayType',
      name: 'PayType',
      component: PayType
    },
    {
      path: '/RegisterTeach',
      name: 'RegisterTeach',
      component: RegisterTeach
    },
  ]
})
