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
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/weight', component: () => import('@/pages/Weight') },
        { path: '/sports', component: () => import('@/pages/Sport') },
        {
          path: '/meal',
          component: () => import('@/pages/meal/Meal'),
          children: [
            { path: '/meal/material', component: () => import('@/pages/meal/Material') },
            { path: '/meal/food', component: () => import('@/pages/meal/Food') },
            { path: '/meal/food/category', component: () => import('@/pages/meal/FoodCategory') },
            { path: '/meal/record', component: () => import('@/pages/meal/Record') },
            { path: '/', redirect: '/meal/material' }
          ]
        }
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
