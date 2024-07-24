<template>
  <div class="h-[75vh] flex justify-center">
    <el-result
      icon="success"
      :title="$t('pages.result.success.title')"
      :sub-title="$t('pages.result.success.subtitle')"
    >
      <template #extra>
        <el-button @click="() => $router.push('/detail/advanced')">
          {{ $t('pages.result.success.progress') }}</el-button
        >
        <el-button type="primary" @click="() => $router.push('/')">{{
          $t('pages.result.success.back')
        }}</el-button>
      </template>
    </el-result>
  </div>
</template>
