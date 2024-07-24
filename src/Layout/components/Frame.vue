<script setup lang="ts">
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
const loading = ref(true)

const route = useRoute()
watch(
  () => route.fullPath,
  () => {
    if (route.meta.frameSrc && !route.meta.frameBlank) loading.value = true
  }
)
</script>

<template>
  <div v-if="route.meta && !route.meta.frameBlank && route.meta.frameSrc" v-loading="loading">
    <iframe
      :src="route.meta.frameSrc as string"
      style="height: calc(100vh - 96px); width: 100%"
      @load="loading = false"
    />
  </div>
</template>
