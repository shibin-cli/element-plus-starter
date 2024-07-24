<script setup lang="ts">
import ResultWifiIcon from '@/assets/icons/assets-result-404.svg?component'
</script>
<template>
  <div class="h-[75vh] flex justify-center">
    <el-result title="404 Not Found" :sub-title="$t('pages.result.404.tips')">
      <template #icon>
        <result-wifi-icon />
      </template>
      <template #extra>
        <el-button type="primary" @click="() => $router.push('/')">
          {{ $t('pages.result.404.back') }}</el-button
        >
      </template>
    </el-result>
  </div>
</template>
<style scoped lang="scss">
:deep(.#{$namespace}-result__icon svg) {
  width: 200px;
  height: 140px;
  color: $primary;
}
</style>
