import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      icon: 'home', title: 'Home'
    },
    component: () => import(/* webpackChunckName: home */'../pages/home/Home')
  },
  {
    path: '/lista-gastos',
    name: 'lista-gastos',
    meta: {
      icon: 'list-ul', title: 'Lista Gastos'
    },
    component: () => import(
      /* webpackChunckName: lista-gastos */
      '../pages/lista-gastos/ListaGastos'
    )
  },
  {
    path: '/login',
    name: 'login',
    meta: {title: 'Login'},
    component: () => import(/* webpackChunckName: login */'../pages/login/Login')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - Expenses`

  if(!window.uid && to.name != 'login'){
    next({name: 'login'})
  } else {
  next()
  }
})

export default router
