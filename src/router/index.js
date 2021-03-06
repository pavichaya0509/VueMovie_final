import Vue from 'vue'
import VueRouter from 'vue-router'

import Ticket from '../components/Ticket.vue'
import movie from '../components/movie.vue'
import VueTyperPlugin from 'vue-typer'


import {BootstrapVue , IconsPlugin} from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import axios from "axios"
import Vueaxios from 'vue-axios'

import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueTyperPlugin)

Vue.use(VueRouter)
Vue.use(axios, Vueaxios)

const routes = [
  {
    path: '/',
    name: 'movie',
    component: movie
  },
  {
    path: '/ticket/:id',
    name: 'Ticket',
    component: Ticket
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
