import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _9f668d00 = () => interopDefault(import('..\\pages\\forms.vue' /* webpackChunkName: "pages/forms" */))
const _6b7f6cde = () => interopDefault(import('..\\pages\\full-page.vue' /* webpackChunkName: "pages/full-page" */))
const _5c271fcc = () => interopDefault(import('..\\pages\\full-page\\error.vue' /* webpackChunkName: "pages/full-page/error" */))
const _5edc8678 = () => interopDefault(import('..\\pages\\full-page\\error-copy.vue' /* webpackChunkName: "pages/full-page/error-copy" */))
const _9dca5240 = () => interopDefault(import('..\\pages\\full-page\\lock-screen.vue' /* webpackChunkName: "pages/full-page/lock-screen" */))
const _57cdf4fb = () => interopDefault(import('..\\pages\\full-page\\login.vue' /* webpackChunkName: "pages/full-page/login" */))
const _bc9a33ce = () => interopDefault(import('..\\pages\\full-page\\password-recovery.vue' /* webpackChunkName: "pages/full-page/password-recovery" */))
const _4198bfba = () => interopDefault(import('..\\pages\\profile.vue' /* webpackChunkName: "pages/profile" */))
const _5b415938 = () => interopDefault(import('..\\pages\\tables.vue' /* webpackChunkName: "pages/tables" */))
const _b22009fe = () => interopDefault(import('..\\pages\\auth\\error-copy.vue' /* webpackChunkName: "pages/auth/error-copy" */))
const _6b75f377 = () => interopDefault(import('..\\pages\\auth\\lock-screen.vue' /* webpackChunkName: "pages/auth/lock-screen" */))
const _6cf7e25c = () => interopDefault(import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages/auth/login" */))
const _4e15f570 = () => interopDefault(import('..\\pages\\auth\\password-recovery.vue' /* webpackChunkName: "pages/auth/password-recovery" */))
const _5d09c0ca = () => interopDefault(import('..\\pages\\auth\\register.vue' /* webpackChunkName: "pages/auth/register" */))
const _1db8722c = () => interopDefault(import('..\\pages\\auth\\success.vue' /* webpackChunkName: "pages/auth/success" */))
const _c96862e4 = () => interopDefault(import('..\\pages\\client\\form.vue' /* webpackChunkName: "pages/client/form" */))
const _2558e954 = () => interopDefault(import('..\\pages\\config\\employees.vue' /* webpackChunkName: "pages/config/employees" */))
const _4fa14033 = () => interopDefault(import('..\\pages\\empresas\\Empresas.vue' /* webpackChunkName: "pages/empresas/Empresas" */))
const _4ca429cb = () => interopDefault(import('..\\pages\\empresas\\Regiones.vue' /* webpackChunkName: "pages/empresas/Regiones" */))
const _68335817 = () => interopDefault(import('..\\pages\\empresas\\Sucursales.vue' /* webpackChunkName: "pages/empresas/Sucursales" */))
const _3392bea8 = () => interopDefault(import('..\\pages\\recursos\\resources.vue' /* webpackChunkName: "pages/recursos/resources" */))
const _22fd9bf4 = () => interopDefault(import('..\\pages\\sensors\\areas-trabajo.vue' /* webpackChunkName: "pages/sensors/areas-trabajo" */))
const _7f81c60c = () => interopDefault(import('..\\pages\\sensors\\dashboard.vue' /* webpackChunkName: "pages/sensors/dashboard" */))
const _7ab68626 = () => interopDefault(import('..\\pages\\sensors\\graficas.vue' /* webpackChunkName: "pages/sensors/graficas" */))
const _fe87a1d4 = () => interopDefault(import('..\\pages\\sensors\\graficas-puerta.vue' /* webpackChunkName: "pages/sensors/graficas-puerta" */))
const _725052e6 = () => interopDefault(import('..\\pages\\sensors\\Registros.vue' /* webpackChunkName: "pages/sensors/Registros" */))
const _5ff65ddc = () => interopDefault(import('..\\pages\\sensors\\Sensores.vue' /* webpackChunkName: "pages/sensors/Sensores" */))
const _13414ca3 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _1a189040 = () => interopDefault(import('..\\pages\\client\\_id.vue' /* webpackChunkName: "pages/client/_id" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'hash',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/forms",
    component: _9f668d00,
    meta: {"name":"Cliente","titleStack":["Cliente"]},
    name: "forms"
  }, {
    path: "/full-page",
    component: _6b7f6cde,
    meta: {"name":"FullPage"},
    name: "full-page",
    children: [{
      path: "error",
      component: _5c271fcc,
      meta: {"name":"Error","props":{"isInCard":{"default":true}}},
      name: "full-page-error"
    }, {
      path: "error-copy",
      component: _5edc8678,
      meta: {"name":"ErrorCopy","props":{"isInCard":{"default":false}}},
      name: "full-page-error-copy"
    }, {
      path: "lock-screen",
      component: _9dca5240,
      meta: {"name":"LockScreen"},
      name: "full-page-lock-screen"
    }, {
      path: "login",
      component: _57cdf4fb,
      meta: {"name":"Login"},
      name: "full-page-login"
    }, {
      path: "password-recovery",
      component: _bc9a33ce,
      meta: {"name":"Login"},
      name: "full-page-password-recovery"
    }]
  }, {
    path: "/profile",
    component: _4198bfba,
    meta: {"name":"Profile"},
    name: "profile"
  }, {
    path: "/tables",
    component: _5b415938,
    meta: {"name":"Tables"},
    name: "tables"
  }, {
    path: "/auth/error-copy",
    component: _b22009fe,
    meta: {"name":"ErrorCopy","props":{"isInCard":{"default":false}}},
    name: "auth-error-copy"
  }, {
    path: "/auth/lock-screen",
    component: _6b75f377,
    meta: {"name":"LockScreen"},
    name: "auth-lock-screen"
  }, {
    path: "/auth/login",
    component: _6cf7e25c,
    meta: {"name":"Login","layout":"full-page"},
    name: "auth-login"
  }, {
    path: "/auth/password-recovery",
    component: _4e15f570,
    meta: {"name":"PasswordRecovery"},
    name: "auth-password-recovery"
  }, {
    path: "/auth/register",
    component: _5d09c0ca,
    meta: {"name":"Login","layout":"full-page"},
    name: "auth-register"
  }, {
    path: "/auth/success",
    component: _1db8722c,
    meta: {"name":"Exito","layout":"full-page","props":{"isInCard":{"default":true}}},
    name: "auth-success"
  }, {
    path: "/client/form",
    component: _c96862e4,
    meta: {"name":"ClientDetail","titleStack":["Clientes","Detalle"]},
    name: "client-form"
  }, {
    path: "/config/employees",
    component: _2558e954,
    meta: {},
    name: "config-employees"
  }, {
    path: "/empresas/Empresas",
    component: _4fa14033,
    meta: {"name":"Empresas"},
    name: "empresas-Empresas"
  }, {
    path: "/empresas/Regiones",
    component: _4ca429cb,
    meta: {"name":"Regiones"},
    name: "empresas-Regiones"
  }, {
    path: "/empresas/Sucursales",
    component: _68335817,
    meta: {"name":"Sucursales"},
    name: "empresas-Sucursales"
  }, {
    path: "/recursos/resources",
    component: _3392bea8,
    meta: {},
    name: "recursos-resources"
  }, {
    path: "/sensors/areas-trabajo",
    component: _22fd9bf4,
    meta: {"name":"Sucursales"},
    name: "sensors-areas-trabajo"
  }, {
    path: "/sensors/dashboard",
    component: _7f81c60c,
    meta: {"name":"Incidencias"},
    name: "sensors-dashboard"
  }, {
    path: "/sensors/graficas",
    component: _7ab68626,
    meta: {"name":"Graficass"},
    name: "sensors-graficas"
  }, {
    path: "/sensors/graficas-puerta",
    component: _fe87a1d4,
    meta: {},
    name: "sensors-graficas-puerta"
  }, {
    path: "/sensors/Registros",
    component: _725052e6,
    meta: {"name":"Historico"},
    name: "sensors-Registros"
  }, {
    path: "/sensors/Sensores",
    component: _5ff65ddc,
    meta: {"name":"Sensores"},
    name: "sensors-Sensores"
  }, {
    path: "/",
    component: _13414ca3,
    meta: {"name":"Home"},
    name: "index"
  }, {
    path: "/client/:id?",
    component: _1a189040,
    meta: {"name":"ClientDetail"},
    name: "client-id"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
