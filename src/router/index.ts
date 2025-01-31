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
              path: 'card',
              name: 'cardList',
              component: () => import('@/views/List/CardList.vue')
            },
            {
              path: 'filter',
              name: 'filterList',
              component: () => import('@/views/List/FilterList.vue')
            },
            {
              path: 'tree',
              name: 'tree',
              component: () => import('@/views/List/TreeList.vue')
            }
          ]
        },
        {
          path: 'detail',
          name: 'detail',
          children: [
            {
              path: '',
              name: 'baseDetail',
              component: () => import('@/views/Detail/Base/Index.vue')
            },
            {
              path: 'advanced',
              name: 'advancedDetail',
              component: () => import('@/views/Detail/Advanced/Index.vue')
            },
            {
              path: 'deploy',
              name: 'deployDetail',
              component: () => import('@/views/Detail/Deploy/Index.vue')
            },
            {
              path: 'secondary',
              name: 'secondaryDetail',
              component: () => import('@/views/Detail/Secondary/Index.vue')
            }
          ]
        },
        {
          path: 'frame',
          name: 'frame',
          children: [
            {
              path: 'doc',
              name: 'doc',
              component: () => import('@/views/Frame/Index.vue'),
              meta: {
                frameSrc: 'https://element-plus.org/zh-CN',
                frameBlank: false
              }
            },
            {
              path: 'element-plus',
              name: 'element-plus',
              component: () => import('@/views/Frame/Index.vue'),
              meta: {
                frameSrc: 'https://element-plus.org/zh-CN/component/overview.html',
                frameBlank: false
              }
            }
          ]
        },
        {
          path: 'result',
          name: 'result',
          children: [
            {
              path: 'success',
              name: 'success',
              component: () => import('@/views/Result/Success.vue')
            },
            {
              path: 'fail',
              name: 'fail',
              component: () => import('@/views/Result/Fail.vue')
            },
            {
              path: 'network-error',
              name: 'networkError',
              component: () => import('@/views/Result/NetworkError.vue')
            },
            {
              path: '403',
              name: '403',
              component: () => import('@/views/Result/403.vue')
            },
            {
              path: '404',
              name: '404',
              component: () => import('@/views/Result/404.vue')
            },
            {
              path: '500',
              name: '500',
              component: () => import('@/views/Result/500.vue')
            },
            {
              path: 'browser-incompatible',
              name: 'BrowserIncompatible',
              component: () => import('@/views/Result/BrowserIncompatible.vue')
            },
            {
              path: 'maintenance',
              name: 'maintenance',
              component: () => import('@/views/Result/Maintenance.vue')
            }
          ]
        },
        {
          path: 'form',
          name: 'form',
          children: [
            {
              path: '',
              name: 'baseForm',
              component: () => import('@/views/Form/BaseForm/Index.vue')
            },
            {
              path: 'step',
              name: 'stepForm',
              component: () => import('@/views/Form/StepForm/Index.vue')
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
