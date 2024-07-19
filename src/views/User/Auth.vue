<script setup lang="ts">
import { ref } from 'vue'

// import TdesignSetting from '@/layouts/setting.vue';

import LoginHeader from './components/Header.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

const type = ref('login')
const switchType = (val: string) => {
  type.value = val
  console.log(val)
}
</script>

<template>
  <div class="light login-wrapper">
    <login-header />
    <div class="login-container">
      <div class="title-container">
        <h1 class="title margin-no">{{ $t('pages.login.loginTitle') }}</h1>
        <h1 class="title">TDesign Starter</h1>
        <div class="mt-4">
          <p class="mr-2 inline-block text-sm">
            {{ type == 'register' ? $t('pages.login.existAccount') : $t('pages.login.noAccount') }}
          </p>
          <p
            class="inline-block text-sm cursor-pointer"
            @click="switchType(type == 'register' ? 'login' : 'register')"
          >
            {{ type == 'register' ? $t('pages.login.signIn') : $t('pages.login.createAccount') }}
          </p>
        </div>
      </div>
      <login v-if="type === 'login'" />
      <register v-else />
      <!-- <tdesign-setting /> -->
    </div>
  </div>
</template>
<style lang="scss">
.light {
  &.login-wrapper {
    background-color: white;
    background-image: url('@/assets/img/assets-login-bg-white.png');
  }
}

.dark {
  &.login-wrapper {
    background-color: var(--td-bg-color-page);
    background-image: url('@/assets/img/assets-login-bg-black.png');
  }
}

.login-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-size: cover;
  background-position: 100%;
  position: relative;
}

.login-container {
  position: absolute;
  top: 22%;
  left: 5%;
  min-height: 500px;
  .title {
    font-size: 36px;
    line-height: 44px;
    margin-top: 4px;
    @apply font-bold;
  }
}
</style>
