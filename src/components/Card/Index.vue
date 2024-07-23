<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>
<template>
  <div class="bg-white rounded-md p-8">
    <div v-if="title" class="flex items-center flex-wrap mb-6">
      <div class="flex-1">
        <div class="text-xl text-nowrap h-[34px]">{{ title }}</div>
      </div>
      <div>
        <slot name="action" />
      </div>
    </div>
    <div>
      <slot name="default" />
      <slot name="content" />
    </div>
  </div>
</template>
