<script setup lang="ts">
import { ref } from 'vue'
import { User, Lock, Refresh } from '@element-plus/icons-vue'
import QrcodeVue from 'qrcode.vue'
const countDown = ref(0)

const type = ref('password')
function switchType(val: string) {
  type.value = val
}
const formData = ref({
  username: 'admin',
  password: 'admin',
  phone: '',
  code: ''
})
</script>
<template>
  <el-form class="mt-12 max-w-full md:w-[400px]">
    <template v-if="type == 'password'">
      <el-form-item>
        <el-input
          size="large"
          autocomplete="off"
          v-model="formData.username"
          :placeholder="$t('pages.login.input.account')"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><svg-icon icon="user" /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          size="large"
          type="password"
          autocomplete="off"
          show-password
          v-model="formData.password"
          :placeholder="$t('pages.login.input.password')"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><svg-icon icon="password" /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <div class="mb-4">
        <el-checkbox>{{ $t('pages.login.remember') }}</el-checkbox>
        <span class="float-right primary text-sm">{{ $t('pages.login.forget') }}</span>
      </div>
    </template>
    <template v-else-if="type == 'qrcode'">
      <div class="mb-4 text-sm flex">
        <span class="mr-4">{{ $t('pages.login.wechatLogin') }}</span>
        <span class="primary flex items-center cursor-pointer"
          >{{ $t('pages.login.refresh') }} <el-icon><refresh /></el-icon>
        </span>
      </div>
      <qrcode-vue value="" :size="192" level="H" />
    </template>
    <template v-else>
      <el-form-item>
        <el-input
          size="large"
          autocomplete="off"
          v-model="formData.phone"
          :placeholder="$t('pages.login.input.phone')"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><svg-icon icon="user" /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <div class="flex w-full">
          <el-input
            size="large"
            autocomplete="off"
            v-model="formData.code"
            :placeholder="$t('pages.login.input.verification')"
            class="flex-1 mr-3"
          />
          <el-button size="large">
            {{ countDown == 0 ? $t('pages.login.sendVerification') : `${countDown}秒后可重发` }}
          </el-button>
        </div>
      </el-form-item>
    </template>
  </el-form>
  <el-form-item class="mt-10" v-if="type !== 'qrcode'">
    <el-button type="primary" size="large" class="w-full">{{ $t('pages.login.signIn') }}</el-button>
  </el-form-item>
  <div class="mt-6 primary text-sm">
    <span class="cursor-pointer mr-4" v-if="type !== 'password'" @click="switchType('password')">{{
      $t('pages.login.accountLogin')
    }}</span>
    <span class="cursor-pointer mr-4" v-if="type !== 'qrcode'" @click="switchType('qrcode')">{{
      $t('pages.login.wechatLogin')
    }}</span>
    <span class="cursor-pointer" v-if="type !== 'phone'" @click="switchType('phone')">{{
      $t('pages.login.phoneLogin')
    }}</span>
  </div>
</template>
<style scoped lang="scss">
.verify-input {
  display: inline-block;
}
</style>
