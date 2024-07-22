<script setup lang="ts">
import { ref } from 'vue'

const countDown = ref(0)

const type = ref('phone')
function switchType(val: string) {
  type.value = val
}
const formData = ref({
  password: '',
  phone: '',
  code: '',
  email: ''
})
</script>
<template>
  <el-form class="mt-12 max-w-full md:w-[400px]">
    <template v-if="type === 'phone'">
      <el-form-item>
        <el-input
          v-model="formData.phone"
          size="large"
          autocomplete="off"
          placeholder="请输入您的手机号"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><svg-icon icon="phone" /></el-icon> </template
        ></el-input>
      </el-form-item>
    </template>
    <template v-if="type === 'email'">
      <el-form-item>
        <el-input
          v-model="formData.email"
          size="large"
          autocomplete="off"
          placeholder="请输入您的邮箱"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><svg-icon icon="email" /></el-icon>
          </template>
        </el-input>
      </el-form-item>
    </template>

    <el-form-item>
      <el-input
        v-model="formData.password"
        size="large"
        type="password"
        autocomplete="off"
        show-password
        placeholder="请输入登录密码"
      >
        <template #prefix>
          <svg-icon icon="password" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <div class="flex w-full">
        <el-input
          v-model="formData.code"
          size="large"
          autocomplete="off"
          :placeholder="$t('pages.login.input.verification')"
          class="flex-1 mr-3"
        />
        <el-button size="large">
          {{ countDown == 0 ? $t('pages.login.sendVerification') : `${countDown}秒后可重发` }}
        </el-button>
      </div>
    </el-form-item>
    <div class="mb-4 flex items-center">
      <el-checkbox>我已阅读并同意</el-checkbox>
      <div class="primary text-sm cursor-pointer leading-8 mx-1">服务协议</div>
      和
      <div class="primary text-sm cursor-pointer leading-8 ml-1">隐私声明</div>
    </div>
  </el-form>
  <el-form-item v-if="type !== 'qrcode'" class="mt-10">
    <el-button type="primary" size="large" class="w-full">{{ $t('pages.login.signIn') }}</el-button>
  </el-form-item>
  <div class="mt-6 primary text-sm">
    <span class="cursor-pointer" @click="switchType(type == 'phone' ? 'email' : 'phone')">{{
      type == 'phone' ? '使用邮箱注册' : '使用手机号注册'
    }}</span>
  </div>
</template>
<style scoped>
.verify-input {
  display: inline-block;
}
</style>
