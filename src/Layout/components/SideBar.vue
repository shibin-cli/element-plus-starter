<script setup lang="ts">
import LogoFullIcon from '@/assets/icons/assets-logo-full.svg?component'
import LogoIcon from '@/assets/icons/assets-t-logo.svg?component'

import useThemeStore from '@/stores/theme'
import { useRoute } from 'vue-router'

const route = useRoute()
interface MenuItem {
  path: string
  title: string
  icon?: any
  isSvgIcon?: boolean
  children?: MenuItem[]
  // 是否为外部链接
  meta?: {
    frameSrc?: string
    frameBlank?: boolean
  }
}
type Menu = MenuItem[]
const store = useThemeStore()
const menu: Menu = [
  {
    path: '/',
    title: '仪表盘',
    icon: 'dashboard',
    isSvgIcon: true,
    children: [
      {
        path: '/',
        title: '仪表盘概览'
      },
      {
        path: '/stat-chart',
        title: '统计报表'
      }
    ]
  },
  {
    path: '/list',
    title: '列表',
    icon: 'list',
    isSvgIcon: true,
    children: [
      {
        path: '/list',
        title: '基础列表页'
      },
      {
        path: '/list/card',
        title: '卡片列表页'
      },
      {
        path: '/list/filter',
        title: '筛选列表页'
      },
      {
        path: '/list/tree',
        title: '树状筛选列表页'
      }
    ]
  },
  {
    path: '/form',
    title: '表单页',
    isSvgIcon: true,
    icon: 'edit',
    children: [
      {
        path: '/form',
        title: '基础表单页'
      },
      {
        path: '/form/step',
        title: '分步表单页'
      }
    ]
  },
  {
    path: '/detail',
    title: '详情页',
    isSvgIcon: true,
    icon: 'layers',
    children: [
      {
        path: '/detail',
        title: '基础详情页'
      },
      {
        path: '/detail/advanced',
        title: '卡片表单页'
      },
      {
        path: '/detail/deploy',
        title: '数据详情页'
      },
      {
        path: '/detail/secondary',
        title: '二级详情页'
      }
    ]
  },
  {
    path: '/frame',
    title: '外部网页',
    isSvgIcon: true,
    icon: 'language',
    children: [
      {
        path: '/frame/doc',
        title: '使用文档（内嵌）',
        meta: {
          frameSrc: 'https://element-plus.org/zh-CN/guide/quickstart.html',
          frameBlank: false
        }
      },
      {
        path: '/frame/element-plus',
        title: 'Element-plus文档（内嵌）',
        meta: {
          frameSrc: 'https://element-plus.gitee.io/#/zh-CN',
          frameBlank: false
        }
      },
      {
        path: '/frame/element-plus',
        title: 'Element-plus文档（外链）',
        meta: {
          frameSrc: 'https://element-plus.gitee.io/#/zh-CN',
          frameBlank: true
        }
      }
    ]
  },
  {
    path: '/profile',
    title: '个人中心',
    isSvgIcon: true,
    icon: 'user-circle'
  },
  {
    path: '/auth',
    title: '登录页',
    isSvgIcon: true,
    icon: 'login'
  }
]
const getHref = (item: MenuItem) => {
  if (!item.meta) return
  const { frameSrc = '', frameBlank = false } = item.meta
  if (frameSrc && frameBlank) {
    return frameSrc.match(/(http|https):\/\/([\w.]+\/?)\S*/)
  }
  return null
}
const openHref = (url: string) => {
  window.open(url)
}
</script>
<template>
  <div class="flex flex-col h-full">
    <div class="menu-logo">
      <logo-icon v-if="store.collapse" class="w-full h-[28px] cursor-pointer" />
      <logo-full-icon v-else class="w-full px-6 cursor-pointer h-[28px]" />
    </div>
    <div class="flex-1 flex flex-col">
      <el-menu
        class="flex-1"
        router
        :collapse="store.collapse"
        :collapse-transition="false"
        :default-active="route.path"
      >
        <template v-for="item in menu" :key="item.path">
          <template v-if="item.children">
            <el-sub-menu :title="item.title" :index="item.path">
              <template #title>
                <el-icon>
                  <svg-icon v-if="item.isSvgIcon" :icon="item.icon" />

                  <component :is="item.icon" v-else />
                </el-icon>

                <span>{{ item.title }}</span>
              </template>

              <template v-for="child in item.children" :key="child.path">
                <el-menu-item
                  v-if="child.meta?.frameSrc && getHref(child)"
                  @click="openHref(child.meta.frameSrc)"
                >
                  <span>{{ child.title }}</span>
                </el-menu-item>
                <el-menu-item v-else :index="child.path">{{ child.title }}</el-menu-item>
              </template>
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item
              v-if="item.meta?.frameSrc && getHref(item)"
              @click="openHref(item.meta.frameSrc)"
            >
              <span>{{ item.title }} frame</span>
            </el-menu-item>
            <el-menu-item v-else :index="item.path">
              <el-icon>
                <svg-icon v-if="item.isSvgIcon" :icon="item.icon" />
                <component :is="item.icon" v-else />
              </el-icon>
              <span>{{ item.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<style scoped lang="scss">
.menu-logo {
  height: $header-height;
  border-bottom: 1px solid #e7e7e7;
  @apply flex items-center pl-6 w-full;
}
:deep(.#{$namespace}-menu) {
  border-right: 0;
  .#{$namespace}-menu-item.is-active {
    background-color: var(--#{$namespace}-color-primary-light-8);
  }
  .#{$namespace}-sub-menu .#{$namespace}-menu-item,
  .#{$namespace}-menu-item,
  .#{$namespace}-sub-menu__title {
    height: 36px;
  }
}
</style>
