import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/home/Home')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/login/Login')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(!window.uid && to.name != 'login'){
    next({name: 'login'})
  } else {
  next()
  }
})

export default router
