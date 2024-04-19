import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      component: Layout,
      children: [
        { path: '/home', component: Home },
        { path: '/weight', component: () => import('@/pages/Weight') },
        { path: '/sports', component: () => import('@/pages/Sport') },
        { path: '/meal', component: () => import('@/pages/Meal') }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  // TODO: check if user is logged in
  next()
})

export default router
