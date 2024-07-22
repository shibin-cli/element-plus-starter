import 'nprogress/nprogress.css'

import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard/Index.vue'
import Layout from '@/Layout/Index.vue'
import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'dashboard',
          children: [
            {
              path: '',
              name: 'dashboard-interview',
              component: Dashboard
            },
            {
              path: 'stat-chart',
              name: 'statChart',
              component: () => import('@/views/Dashboard/StatChart.vue')
            }
          ]
        },

        {
          path: 'list',
          name: 'list',
          children: [
            {
              path: '',
              name: 'baseList',
              component: () => import('@/views/List/BaseList.vue')
            },
            {
              path: 'card-list',
              name: 'cardList',
              component: () => import('@/views/List/CardList.vue')
            },
            {
              path: 'filter-list',
              name: 'filterList',
              component: () => import('@/views/List/FilterList.vue')
            }
          ]
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/User/Profile.vue')
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/User/Auth.vue')
    }
  ]
})
router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})
export default router
