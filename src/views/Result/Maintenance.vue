<script setup lang="ts">
import ResultMaintenanceIcon from '@/assets/icons/assets-result-maintenance.svg?component'
</script>
<template>
  <div class="h-[75vh] flex justify-center">
    <el-result
      :title="$t('pages.result.maintenance.title')"
      :sub-title="$t('pages.result.maintenance.subtitle')"
    >
      <template #icon>
        <result-maintenance-icon />
      </template>
      <template #extra>
        <el-button type="primary" @click="() => $router.push('/')">
          {{ $t('pages.result.maintenance.back') }}</el-button
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
