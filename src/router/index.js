import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import BannerSetting from '../views/BannerSetting.vue'
import ProductsView from '../views/ProductsView.vue'
import OrderManage from '../views/OrderManage.vue'
import ProductView from '../views/ProductView.vue'

import { computed } from 'vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/banner-setting',
      name: 'BannerSetting',
      component: BannerSetting
    },
    {
      path: '/products',
      name: 'ProductsView',
      component: ProductsView
    },
    {
      path: '/product/:id',
      name: 'ProductView',
      component: ProductView
    },
    {
      path: '/order-manage',
      name: 'OrderManage',
      component: OrderManage
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    { path: '/:pathMatch(.*)', component: HomeView }
  ]
})

// 檢測是否已登入
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // console.log('token', token)

  if (!token && to.name !== 'login' && from.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'home') {
    next({ name: 'ProductsView' })
  } else {
    next()
  }
})

export default router
