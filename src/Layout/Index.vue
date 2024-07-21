<script setup lang="ts">
import LayoutHeader from './components/LayoutHeader.vue'
import SideBar from './components/SideBar.vue'

import useThemeStore from '@/stores/theme'

const store = useThemeStore()
</script>
<template>
  <el-container class="h-[100vh]">
    <el-aside
      :width="store.collapse ? '64px' : '232px'"
      class="h-full bg-white transition-all duration-[.28s]"
    >
      <side-bar />
    </el-aside>
    <el-container>
      <el-header class="bg-white border-bottom">
        <layout-header />
      </el-header>
      <el-scrollbar>
        <el-main>
          <router-view v-slot="{ Component }">
            <transition name="fade">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>
<style scoped lang="scss">
:deep(.#{$namespace}-header) {
  height: $header-height;
  border-bottom: 1px solid $border-color;
}
</style>
