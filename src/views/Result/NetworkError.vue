<script setup lang="ts">
import ResultWifiIcon from '@/assets/icons/assets-result-wifi.svg?component'
</script>
<template>
  <div class="h-[75vh] flex justify-center">
    <el-result
      :title="$t('pages.result.networkError.title')"
      :sub-title="$t('pages.result.networkError.subtitle')"
    >
      <template #icon>
        <result-wifi-icon />
      </template>
      <template #extra>
        <el-button @click="() => $router.push('/')"> {{ $t('pages.result.fail.back') }}</el-button>
        <el-button type="primary" @click="() => $router.push('/form')">{{
          $t('pages.result.fail.modify')
        }}</el-button>
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
