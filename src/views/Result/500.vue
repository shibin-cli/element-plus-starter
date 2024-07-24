<script setup lang="ts">
import ResultWifiIcon from '@/assets/icons/assets-result-500.svg?component'
</script>
<template>
  <div class="h-[75vh] flex justify-center">
    <el-result title="500 Internal Server Error" :sub-title="$t('pages.result.500.subtitle')">
      <template #icon>
        <result-wifi-icon />
      </template>
      <template #extra>
        <el-button type="primary" @click="() => $router.push('/')">
          {{ $t('pages.result.500.back') }}</el-button
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
