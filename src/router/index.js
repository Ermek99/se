import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Welcome from '@/views/Welcome.vue'
import Form from '@/views/Form.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,

  },
  {
    path: '/user/:hash(.*)',
    name: 'Form',
    component: Form,

  },
  {
    path: '/home',
    name: 'Home',
    component: Home,

  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
