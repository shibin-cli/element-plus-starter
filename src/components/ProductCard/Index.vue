<script setup lang="ts">
import { MoreFilled } from '@element-plus/icons-vue'
import type { CardList } from '@/types/list'

const props = defineProps<{
  product: CardList
}>()
const emits = defineEmits<{
  (e: 'manage-product', product: CardList): void
  (e: 'delete-product', product: CardList): void
}>()

const handleClickManage = () => {
  emits('manage-product', props.product)
}

const handleClickDelete = () => {
  emits('delete-product', props.product)
}
</script>
<template>
  <div class="bg-white rounded-md p-6 mb-4">
    <div class="flex items-center">
      <div class="flex-1 mb-[-6px]">
        <el-avatar :size="56" class=""> </el-avatar>
      </div>
      <div>
        <el-button v-if="product.isSetup" size="small" type="success">{{
          $t('components.isSetup.on')
        }}</el-button>
        <el-button v-else size="small" disabled>{{ $t('components.isSetup.off') }}</el-button>
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
        <el-avatar :size="36" class="border-2 border-white border-solid ml-[-6px] cursor-pointer">
          <svg-icon icon="add" />
        </el-avatar>
      </div>
      <div>
        <el-dropdown trigger="click">
          <el-button :icon="MoreFilled" text></el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleClickManage">{{
                $t('components.manage')
              }}</el-dropdown-item>
              <el-dropdown-item @click="handleClickDelete">{{
                $t('components.delete')
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
