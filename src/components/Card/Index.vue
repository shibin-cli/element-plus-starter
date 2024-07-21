<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>
<template>
  <div class="bg-white rounded-md p-8">
    <div class="flex items-center">
      <div class="flex-1">
        <div class="text-xl">{{ title }}</div>
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
