<script setup lang="ts">
import LogoFullIcon from '@/assets/icons/assets-logo-full.svg?component'
import LogoIcon from '@/assets/icons/assets-t-logo.svg?component'

import { DataBoard, List } from '@element-plus/icons-vue'
import { type DefineComponent } from 'vue'
import useThemeStore from '@/stores/theme'
import { useRoute } from 'vue-router'

const route = useRoute()
interface MenuItem {
  path: string
  title: string
  icon?: any
  isSvgIcon?: boolean
  children?: MenuItem[]
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
        path: '/list/card-list',
        title: '卡片列表页'
      },
      {
        path: '/list/filter-list',
        title: '筛选列表页'
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
</script>
<template>
  <div class="flex flex-col h-full">
    <div class="menu-logo">
      <logo-icon v-if="store.collapse" class="w-full h-[28px] cursor-pointer" />
      <logo-full-icon class="w-full px-6 cursor-pointer h-[28px]" v-else />
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

                  <component v-else :is="item.icon" />
                </el-icon>

                <span>{{ item.title }}</span>
              </template>

              <el-menu-item :index="child.path" v-for="child in item.children" :key="child.path">{{
                child.title
              }}</el-menu-item>
            </el-sub-menu>
          </template>
          <template v-else>
            <el-menu-item :index="item.path">
              <el-icon>
                <svg-icon v-if="item.isSvgIcon" :icon="item.icon" />
                <component v-else :is="item.icon" />
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
