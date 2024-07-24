<script setup lang="ts">
import ResultWifiIcon from '@/assets/icons/assets-result-403.svg?component'
</script>
<template>
  <div class="h-[75vh] flex justify-center">
    <el-result title="403 Forbidden" :sub-title="$t('pages.result.403.tips')">
      <template #icon>
        <result-wifi-icon />
      </template>
      <template #extra>
        <el-button type="primary" @click="() => $router.push('/')">
          {{ $t('pages.result.403.back') }}</el-button
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
