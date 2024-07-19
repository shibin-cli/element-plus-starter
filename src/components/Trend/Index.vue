<script setup lang="ts">
defineProps<{
  type: 'upTrend' | 'downTrend'
  count: number | string
}>()
</script>
<template>
  <div class="inline-flex items-center" :class="type === 'upTrend' ? 'success' : 'error'">
    <template v-if="type === 'upTrend'">
      <span class="trend-icon-wrap mx-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4.5 8L8 4.5L11.5 8" stroke="currentColor" stroke-width="1.5" />
          <path d="M8 5V12" stroke="currentColor" stroke-width="1.5" />
        </svg>
      </span>
      <span> {{ count }}</span>
    </template>
    <template v-else>
      <span class="trend-icon-wrap mx-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11.5 8L8 11.5L4.5 8" stroke="currentColor" stroke-width="1.5" />
          <path d="M8 11L8 4" stroke="currentColor" stroke-width="1.5" />
        </svg>
      </span>
      <span>{{ count }}</span>
    </template>
  </div>
</template>
<style scoped lang="scss">
.trend-icon-wrap {
  border-radius: 50%;
}

.success {
  color: var(--#{$namespace}-color-success);
  .trend-icon-wrap {
    background: var(--#{$namespace}-color-success-light-7);
  }
}

.error {
  color: var(--#{$namespace}-color-error);
  .trend-icon-wrap {
    background: var(--#{$namespace}-color-error-light-7);
  }
}
</style>
