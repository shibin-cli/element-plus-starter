<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>
<template>
  <div class="bg-white rounded-md p-8">
    <div class="flex items-center flex-wrap">
      <div class="flex-1">
        <div class="text-xl text-nowrap">{{ title }}</div>
      </div>
      <div>
        <slot name="action" />
      </div>
    </div>
    <div class="mt-6">
      <slot name="content" />
    </div>
  </div>
</template>
