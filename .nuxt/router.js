import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _be1b6fae = () => interopDefault(import('../pages/configuraciones/index.vue' /* webpackChunkName: "pages/configuraciones/index" */))
const _7a4de5be = () => interopDefault(import('../pages/home/index.vue' /* webpackChunkName: "pages/home/index" */))
const _3b1a3adb = () => interopDefault(import('../pages/implementos/index.vue' /* webpackChunkName: "pages/implementos/index" */))
const _5c631cf0 = () => interopDefault(import('../pages/malla_curricular/index.vue' /* webpackChunkName: "pages/malla_curricular/index" */))
const _50601818 = () => interopDefault(import('../pages/new/index.vue' /* webpackChunkName: "pages/new/index" */))
const _a34ee84c = () => interopDefault(import('../pages/profesores/index.vue' /* webpackChunkName: "pages/profesores/index" */))
const _83fa3816 = () => interopDefault(import('../pages/registro/index.vue' /* webpackChunkName: "pages/registro/index" */))
const _207601bc = () => interopDefault(import('../pages/reservar/index.vue' /* webpackChunkName: "pages/reservar/index" */))
const _7941efbf = () => interopDefault(import('../pages/salones/index.vue' /* webpackChunkName: "pages/salones/index" */))
const _17204847 = () => interopDefault(import('../pages/usuarios/index.vue' /* webpackChunkName: "pages/usuarios/index" */))
const _c27adbba = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/configuraciones",
      component: _be1b6fae,
      name: "configuraciones"
    }, {
      path: "/home",
      component: _7a4de5be,
      name: "home"
    }, {
      path: "/implementos",
      component: _3b1a3adb,
      name: "implementos"
    }, {
      path: "/malla_curricular",
      component: _5c631cf0,
      name: "malla_curricular"
    }, {
      path: "/new",
      component: _50601818,
      name: "new"
    }, {
      path: "/profesores",
      component: _a34ee84c,
      name: "profesores"
    }, {
      path: "/registro",
      component: _83fa3816,
      name: "registro"
    }, {
      path: "/reservar",
      component: _207601bc,
      name: "reservar"
    }, {
      path: "/salones",
      component: _7941efbf,
      name: "salones"
    }, {
      path: "/usuarios",
      component: _17204847,
      name: "usuarios"
    }, {
      path: "/",
      component: _c27adbba,
      name: "index"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
