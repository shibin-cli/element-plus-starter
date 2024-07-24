<script setup lang="ts">
import ResultIeIcon from '@/assets/icons/assets-result-ie.svg?component'
function open(url: string) {
  window.open(url)
}
</script>
<template>
  <div class="h-[75vh] flex justify-center">
    <el-result
      :title="$t('pages.result.browserIncompatible.title')"
      :sub-title="$t('pages.result.browserIncompatible.subtitle')"
    >
      <template #icon>
        <result-ie-icon />
      </template>
      <template #extra>
        <el-button type="primary" @click="() => $router.push('/')">
          {{ $t('pages.result.browserIncompatible.back') }}</el-button
        >
        <div
          class="mt-20 bg-white rounded-md px-8 py-6 flex items-center text-gray-400 w-[600px] justify-between"
        >
          <div class="text-sm">
            {{ $t('pages.result.browserIncompatible.recommend') }}
          </div>
          <div class="text-center flex">
            <div class="cursor-pointer" @click="() => open('https://www.google.cn/chrome')">
              <div>
                <img
                  src="https://tdesign.gtimg.com/starter/result-page/chorme.png"
                  width="40"
                  class="inline-block"
                />
              </div>
              <div class="mt-2">Chrome</div>
            </div>
            <div class="ml-8 cursor-pointer" @click="() => open('https://browser.qq.com')">
              <div>
                <img
                  src="https://tdesign.gtimg.com/starter/result-page/qq-browser.png"
                  width="40"
                  class="inline-block"
                />
              </div>
              <div class="mt-2">QQ Browser</div>
            </div>
          </div>
        </div>
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
