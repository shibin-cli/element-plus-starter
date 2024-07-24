<template>
  <div class="h-[75vh] flex justify-center">
    <el-result
      icon="error"
      :title="$t('pages.result.fail.title')"
      :sub-title="$t('pages.result.fail.subtitle')"
    >
      <template #extra>
        <el-button @click="() => $router.push('/')"> {{ $t('pages.result.fail.back') }}</el-button>
        <el-button type="primary" @click="() => $router.push('/form')">{{
          $t('pages.result.fail.modify')
        }}</el-button>
      </template>
    </el-result>
  </div>
</template>
