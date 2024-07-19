<script setup lang="ts">
import LogoFullIcon from '@/assets/icons/assets-logo-full.svg?component'
</script>
<template>
  <div class="login-header">
    <LogoFullIcon class="w-[188px]" />
    <div class="operations-container">
      <!-- <el-button theme="default" shape="square" variant="text">
        <el-icon name="logo-github" class="icon" />
      </el-button>
      <el-button theme="default" shape="square" variant="text">
        <el-icon name="help-circle" class="icon" />
      </el-button>
      <el-button theme="default" shape="square" variant="text">
        <el-icon name="setting" class="icon" />
      </el-button> -->
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login-header {
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);
  color: var(--td-text-color-primary);
  height: 56px;

  .operations-container {
    display: flex;
    align-items: center;

    .t-button {
      margin-left: var(--td-comp-margin-l);
    }
  }
}
</style>
