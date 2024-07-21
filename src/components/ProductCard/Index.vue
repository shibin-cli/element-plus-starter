<script setup lang="ts">
import { More, FolderAdd } from '@element-plus/icons-vue'
import type { PropType } from 'vue'
interface CardProductType {
  type: number
  isSetup: boolean
  description: string
  name: string
}
defineProps<{
  product: CardProductType
}>()
</script>
<template>
  <div class="bg-white rounded-md p-6 mb-4">
    <div class="flex items-center">
      <div class="flex-1 mb-[-6px]">
        <el-avatar :size="56" class=""> </el-avatar>
      </div>
      <div>
        <el-button size="small" type="success">{{
          product.isSetup ? $t('components.isSetup.on') : $t('components.isSetup.off')
        }}</el-button>
      </div>
    </div>
    <div class="my-6">
      <div class="text-lg mb-2 leading-6">
        {{ product.name }}
      </div>
      <div class="text-sm opacity-60 text-ellipsis line-clamp-2">{{ product.description }}</div>
    </div>
    <div class="flex items-center">
      <div class="flex-1 flex items-center">
        <el-avatar :size="36" class="border-2 border-white border-solid"> </el-avatar>
        <el-avatar
          :size="36"
          class="border-2 border-white border-solid ml-[-6px]"
          :icon="FolderAdd"
        >
        </el-avatar>
      </div>
      <div>
        <el-button :icon="More" text></el-button>
      </div>
    </div>
  </div>
</template>
