import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import Home from '../views/home/index.vue'
import NotFound from '../views/error/404.vue'
import Unauthorized from '../views/error/401.vue'
import Layout from '../views/layout/index.vue'
import { Icon } from 'element-ui'

Vue.use(VueRouter)
Vue.use({Icon})

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

export const DynamicRouter = [
  {
    path:'',
    component:Layout,
    name:'container',
    redirect: '/home',
    meta:{
      requiresAuth : true,
      name: '首页'
    },
    children:[{
      path: '/home',
      component:Home,
      name: 'Home',
      meta:{
        name: '首页',
        Icon: 'icon-name'
      }
    }]
  },
  {
    path: '/401',
    component: Unauthorized
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
