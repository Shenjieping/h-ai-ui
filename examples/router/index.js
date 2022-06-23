import Vue from 'vue'
import Router from 'vue-router'
import navConf from '../nav.config.json'

Vue.use(Router)

const docsRouteFn = (navConf) => {
  let route = []
  Object.keys(navConf).forEach((item) => {
    navConf[item].forEach((nav) => {
      route.push({
        path: nav.path,
        name: nav.name,
        component: (r) =>
          require.ensure([], () => r(require(`@/docs${nav.path}.md`)))
      })
    })
  })
  return route
}
let routes = docsRouteFn(navConf)
routes = routes.concat([
  {
    path: '/',
    name: 'pages',
    component: () => import('@/pages/index.vue'),
  },
])

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
