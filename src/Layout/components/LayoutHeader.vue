<script setup lang="ts">
import LogoFullIcon from '@/assets/icons/assets-logo-full.svg?component'
import { Expand, Fold, ArrowDown } from '@element-plus/icons-vue'
import useThemeStore from '@/stores/theme'
import { useRouter } from 'vue-router'

const store = useThemeStore()
const router = useRouter()
</script>
<template>
  <div class="flex items-center h-full justify-between">
    <div class="flex ml-6">
      <el-button
        :icon="store.collapse ? Expand : Fold"
        text
        @click="store.collapse = !store.collapse"
      ></el-button>
      <el-input class="ml-4" placeholder="输入要搜索内容">
        <template #prefix>
          <el-icon>
            <svg-icon icon="search" />
          </el-icon>
        </template>
      </el-input>
    </div>
    <div class="flex items-center">
      <el-tooltip content="邮箱">
        <el-button text>
          <template #icon>
            <svg-icon icon="email" />
          </template>
        </el-button>
      </el-tooltip>
      <el-tooltip :content="$t('layout.header.code')">
        <el-button text>
          <template #icon>
            <svg-icon icon="github" />
          </template>
        </el-button>
      </el-tooltip>
      <el-tooltip :content="$t('layout.header.help')">
        <el-button text>
          <template #icon>
            <svg-icon icon="help" />
          </template>
        </el-button>
      </el-tooltip>

      <el-button text>
        <template #icon>
          <svg-icon icon="language" />
        </template>
      </el-button>
      <el-dropdown class="ml-4 pr-2">
        <span class="el-dropdown-link">
          <el-button text>
            <el-icon class="mr-1">
              <svg-icon icon="user-circle" />
            </el-icon>
            <span class="text-sm mx-3">User</span>
            <el-icon>
              <arrow-down />
            </el-icon>
          </el-button>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="router.push('/profile')">{{
              $t('layout.header.user')
            }}</el-dropdown-item>
            <el-dropdown-item @click="router.push('/auth')">{{
              $t('layout.header.signOut')
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<style scoped lang="scss">
:deep(.#{$namespace}-button) {
  font-size: 18px !important;
  @apply px-2;
}
:deep(.#{$namespace}-input) {
  box-shadow: none;
  .#{$namespace}-input__wrapper {
    box-shadow: none;
    transition: all 0.28s;
    &:hover {
      background-color: $bg-color;
    }
    &.is-focus {
      background-color: $bg-color;
    }
  }
}
:deep(.#{$namespace}-dropdown) {
  line-height: 32px;
}
</style>
