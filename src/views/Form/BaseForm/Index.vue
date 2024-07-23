<script setup lang="ts">
import { ref } from 'vue'
import { type FormInstance } from 'element-plus'
import {
  FORM_RULES,
  INITIAL_DATA,
  PARTY_A_OPTIONS,
  PARTY_B_OPTIONS,
  TYPE_OPTIONS
} from './constants'
const formData = ref({ ...INITIAL_DATA })
const formRef = ref<FormInstance | null>(null)
function handleSubmit() {
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      // return false
    }
  })
}
</script>
<template>
  <div class="bg-white rounded-md p-8">
    <el-form
      ref="formRef"
      class="max-w-[800px] mx-auto"
      :model="formData"
      :rules="FORM_RULES"
      label-position="top"
    >
      <div class="my-6 text-xl">{{ $t('pages.formBase.title') }}</div>
      <el-row :gutter="32">
        <el-col :sm="12">
          <el-form-item prop="name" :label="$t('pages.formBase.contractName')">
            <el-input v-model="formData.name" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
        <el-col :sm="12">
          <el-form-item prop="type" :label="$t('pages.formBase.contractType')">
            <el-select v-model="formData.type" clearable>
              <el-option
                v-for="item in TYPE_OPTIONS"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            /></el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="16">
          <el-form-item prop="payment" :label="$t('pages.formBase.contractPayType')">
            <div class="mr-4">
              <el-radio-group v-model="formData.payment" class="ml-4">
                <el-radio value="1">{{ $t('pages.formBase.receive') }} </el-radio>
                <el-radio value="2">{{ $t('pages.formBase.pay') }}</el-radio>
              </el-radio-group>
            </div>
            <el-input
              :style="{ width: '160px' }"
              :placeholder="$t('pages.formBase.contractAmountPlaceholder')"
            />
          </el-form-item>
        </el-col>
        <el-col :sm="12">
          <el-form-item prop="partyA" :label="$t('pages.formBase.company')">
            <el-select
              v-model="formData.partyA"
              clearable
              :placeholder="$t('pages.formBase.contractTypePlaceholder')"
            >
              <el-option
                v-for="item in PARTY_A_OPTIONS"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            /></el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12">
          <el-form-item prop="partyB" :label="$t('pages.formBase.employee')">
            <el-select
              v-model="formData.partyB"
              clearable
              :placeholder="$t('pages.formBase.contractTypePlaceholder')"
            >
              <el-option
                v-for="item in PARTY_B_OPTIONS"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            /></el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12">
          <el-form-item prop="signDate" :label="$t('pages.formBase.contractSignDate')">
            <el-date-picker v-model="formData.signDate" type="date" /> </el-form-item
        ></el-col>
        <el-col :sm="12">
          <el-form-item prop="startDate" :label="$t('pages.formBase.contractEffectiveDate')">
            <el-date-picker v-model="formData.startDate" type="date" /> </el-form-item
        ></el-col>
        <el-col :sm="12">
          <el-form-item prop="endDate" :label="$t('pages.formBase.contractEndDate')">
            <el-date-picker v-model="formData.endDate" type="date" /> </el-form-item
        ></el-col>
        <el-col :sm="12">
          <el-form-item prop="files" :label="$t('pages.formBase.upload')" name="files">
            <el-upload
              v-model:file-list="formData.files"
              class="upload-demo"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            >
              <el-button> {{ $t('pages.formBase.uploadFile') }}</el-button>
              <template #tip>
                <div class="opacity-60 text-xs mt-2">请上传pdf文件，大小在60M以内</div>
              </template>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="my-6 text-xl">{{ $t('pages.formBase.otherInfo') }}</div>
      <el-form-item prop="remark" :label="$t('pages.formBase.remark')">
        <el-input
          v-model="formData.comment"
          type="textarea"
          :placeholder="$t('pages.formBase.remarkPlaceholder')"
          :height="124"
        />
      </el-form-item>
      <el-form-item :label="$t('pages.formBase.notaryPublic')">
        <el-avatar :size="36" class="border-2 border-white border-solid"> </el-avatar>
        <el-avatar :size="36" class="border-2 border-white border-solid ml-[-6px] cursor-pointer">
          <svg-icon icon="add" />
        </el-avatar>
      </el-form-item>
      <el-form-item class="mt-8">
        <el-button type="primary" @click="handleSubmit">{{
          $t('pages.formBase.confirm')
        }}</el-button>
        <el-button> {{ $t('pages.formBase.cancel') }} </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped lang="scss">
:deep(.#{$namespace}-col) {
  margin-bottom: 12px;
}
:deep(.#{$namespace}-date-editor.#{$namespace}-input) {
  width: 100%;
}
</style>
