import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _346ed81e = () => interopDefault(import('../pages/news/index.vue' /* webpackChunkName: "pages/news/index" */))
const _1e947db0 = () => interopDefault(import('../pages/post.vue' /* webpackChunkName: "pages/post" */))
const _1f704a06 = () => interopDefault(import('../pages/news/_id.vue' /* webpackChunkName: "pages/news/_id" */))
const _fdc3cb0c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/news",
    component: _346ed81e,
    name: "news"
  }, {
    path: "/post",
    component: _1e947db0,
    name: "post"
  }, {
    path: "/news/:id",
    component: _1f704a06,
    name: "news-id"
  }, {
    path: "/",
    component: _fdc3cb0c,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
