<script setup lang="ts">
import {
  ADDRESS_OPTIONS,
  FORM_RULES,
  INITIAL_DATA1,
  INITIAL_DATA2,
  INITIAL_DATA3,
  NAME_OPTIONS,
  TYPE_OPTIONS
} from './constants'
import { ref, computed } from 'vue'
import { type FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
const formData1 = ref({ ...INITIAL_DATA1 })
const formData2 = ref({ ...INITIAL_DATA2 })
const formData3 = ref({ ...INITIAL_DATA3 })
const activeForm = ref(0)
const amount = computed(() => {
  if (formData1.value.name === '1') {
    return '565421'
  }
  if (formData1.value.name === '2') {
    return '278821'
  }
  if (formData1.value.name === '3') {
    return '109824'
  }
  return '--'
})
const form1Ref = ref<FormInstance | null>(null)
const form2Ref = ref<FormInstance | null>(null)
const form3Ref = ref<FormInstance | null>(null)

const onSubmit = (formRef: FormInstance, val: number) => {
  formRef.validate((valid) => {
    if (valid) {
      activeForm.value = val
    } else {
      // return false
    }
  })
}

const complete = () => {
  const router = useRouter()
  router.replace({ path: '/detail/advanced' })
}
function handlePreStep(formRef: FormInstance) {
  formRef.resetFields()
  activeForm.value = activeForm.value - 1
}
function onReset() {
  form1Ref.value?.resetFields()
  form2Ref.value?.resetFields()
  form3Ref.value?.resetFields()
  activeForm.value = 0
}
</script>
<template>
  <div class="bg-white rounded-md p-8">
    <el-steps :active="activeForm" align-center finish-status="success">
      <el-step
        :title="$t('pages.formStep.step1.title')"
        :description="$t('pages.formStep.step1.subtitle')"
      />
      <el-step
        :title="$t('pages.formStep.step2.title')"
        :description="$t('pages.formStep.step1.subtitle')"
      />
      <el-step
        :title="$t('pages.formStep.step3.title')"
        :description="$t('pages.formStep.step1.subtitle')"
      />
      <el-step
        :title="$t('pages.formStep.step4.title')"
        :description="$t('pages.formStep.step1.subtitle')"
      />
    </el-steps>
    <div class="mt-8">
      <el-alert show-icon>
        <template #title>
          <div class="text-sm font-bold">{{ $t('pages.formStep.step1.rules') }}</div>
        </template>
        <p>
          {{ $t('pages.formStep.step1.rule1') }}
        </p>
        <p>{{ $t('pages.formStep.step1.rule2') }}</p>
        <p>{{ $t('pages.formStep.step1.rule3') }}</p>
      </el-alert>
    </div>
    <div class="mt-6 w-[500px]">
      <el-form
        v-show="activeForm === 0"
        ref="form1Ref"
        label-align="right"
        :label-width="120"
        :rules="FORM_RULES"
        :model="formData1"
      >
        <el-form-item prop="name" :label="$t('pages.formStep.step1.contractName')">
          <el-select v-model="formData1.name" clearable>
            <el-option
              v-for="item in NAME_OPTIONS"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          /></el-select>
        </el-form-item>
        <el-form-item :label="$t('pages.formStep.step1.invoiceType')" prop="type">
          <el-select v-model="formData1.type" clearable>
            <el-option
              v-for="item in TYPE_OPTIONS"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          /></el-select>
        </el-form-item>
        <el-form-item :label="$t('pages.formStep.step1.amount')"> ¥ {{ amount }} </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(form1Ref as FormInstance, 1)">
            {{ $t('pages.formStep.step1.submit') }}</el-button
          >
        </el-form-item>
      </el-form>
      <el-form
        v-show="activeForm === 1"
        ref="form2Ref"
        label-align="right"
        :label-width="120"
        :rules="FORM_RULES"
        :model="formData2"
      >
        <el-form-item :label="$t('pages.formStep.step2.invoiceTitle')" prop="title">
          <el-input
            v-model="formData2.title"
            :placeholder="$t('pages.formStep.step2.invoiceTitlePlaceholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('pages.formStep.step2.taxNum')" prop="taxNum">
          <el-input
            v-model="formData2.taxNum"
            :placeholder="$t('pages.formStep.step2.taxNumPlaceholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('pages.formStep.step2.address')" prop="address">
          <el-input
            v-model="formData2.address"
            :placeholder="$t('pages.formStep.step2.addressPlaceholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('pages.formStep.step2.bank')" prop="bank">
          <el-input
            v-model="formData2.bank"
            :placeholder="$t('pages.formStep.step2.bankPlaceholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('pages.formStep.step2.bankAccount')" prop="bankAccount">
          <el-input
            v-model="formData2.bankAccount"
            :placeholder="$t('pages.formStep.step2.bankAccountPlaceholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('pages.formStep.step2.email')" prop="email">
          <el-input
            v-model="formData2.email"
            :placeholder="$t('pages.formStep.step2.emailPlaceholder')"
          />
        </el-form-item>
        <el-form-item :label="$t('pages.formStep.step2.tel')" prop="tel">
          <el-input
            v-model="formData2.tel"
            :placeholder="$t('pages.formStep.step2.telPlaceholder')"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="handlePreStep(form2Ref as FormInstance)">
            {{ $t('pages.formStep.preStep') }}</el-button
          >
          <el-button type="primary" @click="onSubmit(form2Ref as FormInstance, 2)">
            {{ $t('pages.formStep.step1.submit') }}</el-button
          >
        </el-form-item>
      </el-form>
      <el-form
        v-show="activeForm === 2"
        ref="form3Ref"
        label-align="right"
        :label-width="120"
        :rules="FORM_RULES"
        :model="formData3"
      >
        <el-form-item :label="$t('pages.formStep.step3.consignee')" prop="consignee">
          <el-input v-model="formData3.consignee" />
        </el-form-item>
        <el-form-item :label="$t('pages.formStep.step3.mobileNum')" prop="mobileNum">
          <el-input v-model="formData3.mobileNum" />
        </el-form-item>
        <el-form-item :label="$t('pages.formStep.step3.deliveryAddress')" prop="deliveryAddress">
          <el-select v-model="formData3.deliveryAddress" clearable>
            <el-option
              v-for="item in ADDRESS_OPTIONS"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          /></el-select>
        </el-form-item>
        <el-form-item :label="$t('pages.formStep.step3.fullAddress')" prop="fullAddress">
          <el-input v-model="formData3.fullAddress" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button @click="handlePreStep(form3Ref as FormInstance)">
            {{ $t('pages.formStep.preStep') }}</el-button
          >
          <el-button type="primary" @click="onSubmit(form3Ref as FormInstance, 3)">
            {{ $t('pages.formStep.step1.submit') }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div v-show="activeForm === 3">
      <el-result
        icon="success"
        :title="$t('pages.formStep.step4.finishTitle')"
        :sub-title="$t('pages.formStep.step4.finishTips')"
        class="w-full"
      >
        <template #extra>
          <el-button type="primary" @click="onReset">{{
            $t('pages.formStep.step4.reapply')
          }}</el-button>
          <el-button @click="complete"> {{ $t('pages.formStep.step4.check') }}</el-button>
        </template>
      </el-result>
    </div>
  </div>
</template>
