<script setup lang="ts">
defineProps<{
  title: string
  avatar?: string
  description: string
}>()
</script>
<template>
  <div class="flex items-center mt-6">
    <div class="mr-6">
      <el-avatar :size="48" :src="avatar" />
    </div>
    <div class="flex-1">
      <div class="mb-1 text-md">{{ title }}</div>
      <div class="text-sm opacity-40 line-clamp-2 text-ellipsis">{{ description }}</div>
    </div>
  </div>
</template>
