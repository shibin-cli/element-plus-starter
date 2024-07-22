<script setup lang="ts">
import { ref } from 'vue'
import type { FormRules, FormInstance } from 'element-plus'
const visible = defineModel({ type: Boolean, default: false })
export interface FormData {
  name: string
  status: string
  description: string
  type: string
  mark: string
  amount: number
}
const formData = ref<FormData>({
  name: '',
  status: '',
  description: '',
  type: '',
  mark: '',
  amount: 0
})
const rules: FormRules<FormData> = {
  name: [{ required: true, message: '请输入产品名称' }]
}
const SELECT_OPTIONS = [
  { label: '网关', value: '1' },
  { label: '人工智能', value: '2' },
  { label: 'CVM', value: '3' }
]
const formRef = ref<FormInstance | null>(null)
function handleSubmit() {
  formRef.value?.validate((valid) => {
    console.log(valid)
    if (valid) {
      visible.value = false
    } else {
      //   return false
    }
  })
}
</script>
<template>
  <el-dialog v-model="visible" :title="$t('pages.listCard.create')" :width="680">
    <el-form ref="formRef" :label-width="100" :model="formData" :rules="rules" class="pr-5">
      <el-form-item :label="$t('pages.listCard.productName')" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item :label="$t('pages.listCard.productStatus')" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio value="0">{{ $t('pages.listCard.productStatusEnum.off') }}</el-radio>
          <el-radio value="1">{{ $t('pages.listCard.productStatusEnum.on') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('pages.listCard.productDescription')" prop="description">
        <el-input v-model="formData.description" />
      </el-form-item>
      <el-form-item :label="$t('pages.listCard.productType')" prop="type">
        <el-select v-model="formData.type" clearable>
          <el-option
            v-for="item in SELECT_OPTIONS"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('pages.listCard.productRemark')" prop="mark">
        <el-input v-model="formData.mark" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
