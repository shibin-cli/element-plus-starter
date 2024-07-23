<script setup lang="ts">
import type { IProduct } from '@/types/list'
import { ArrowRight } from '@element-plus/icons-vue'
defineProps<{
  product: IProduct
}>()
</script>
<template>
  <div class="product">
    <h1 class="text-xl">{{ product.name }}</h1>
    <div class="text-sm opacity-40">{{ product.subtitle }}</div>
    <el-space class="mt-4">
      <el-tag effect="dark" type="success"> {{ product.size }}</el-tag>
      <el-tag> {{ product.cpu }}</el-tag>
      <el-tag> {{ product.memory }}</el-tag>
    </el-space>
    <div class="flex text-sm opacity-40 mt-6 items-center justify-between">
      <div class="w-[80%]">{{ product.info }}</div>
      <div>
        <el-icon>
          <arrow-right />
        </el-icon>
      </div>
    </div>
    <div class="absolute bottom-0 left-0 right-0">
      <div class="text-sm opacity-40 text-right m-3">
        {{ product.use }} / {{ product.stock }}（台）
      </div>

      <el-progress
        :percentage="(product.use / product.stock) * 100"
        :color="product.use / product.stock < 0.5 ? '#E24D59' : ''"
        :class="{
          'product-error': product.use / product.stock < 0.5
        }"
        :text-inside="true"
        :show-text="false"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
.product {
  border: 1px solid $border-color;
  height: 240px;
  position: relative;
  @apply p-6 rounded-md mb-4;
  :deep(.#{$namespace}-progress-bar__outer) {
    border-radius: 0;
    background-color: #d4e3fc;
    .#{$namespace}-progress-bar__inner {
      border-radius: 0 0 0 6px;
    }
  }
  .product-error {
    :deep(.#{$namespace}-progress-bar__outer) {
      background-color: #fcd4d4;
    }
  }
}
</style>
