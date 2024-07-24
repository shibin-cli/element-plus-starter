<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { CONTRACT_STATUS, CONTRACT_TYPES, CONTRACT_PAYMENT_TYPES } from '@/utils/constants'
import { getList } from '@/services/list'
import type { ListModel } from '@/types/list'
import Trend from '@/components/Trend/Index.vue'
import { type FormInstance } from 'element-plus'
interface FormData {
  name: string
  no: string
  status?: number
  type: string
}
const { t } = useI18n()
const formData = ref<FormData>({
  name: '',
  no: '',
  type: ''
})
const CONTRACT_STATUS_OPTIONS = [
  { value: CONTRACT_STATUS.FAIL, label: t('components.commonTable.contractStatusEnum.fail') },
  {
    value: CONTRACT_STATUS.AUDIT_PENDING,
    label: t('components.commonTable.contractStatusEnum.audit')
  },
  {
    value: CONTRACT_STATUS.EXEC_PENDING,
    label: t('components.commonTable.contractStatusEnum.pending')
  },
  {
    value: CONTRACT_STATUS.EXECUTING,
    label: t('components.commonTable.contractStatusEnum.executing')
  },
  { value: CONTRACT_STATUS.FINISH, label: t('components.commonTable.contractStatusEnum.finish') }
]

const CONTRACT_TYPE_OPTIONS = [
  { value: CONTRACT_TYPES.MAIN, label: t('components.commonTable.contractTypeEnum.main') },
  { value: CONTRACT_TYPES.SUB, label: t('components.commonTable.contractTypeEnum.sub') },
  {
    value: CONTRACT_TYPES.SUPPLEMENT,
    label: t('components.commonTable.contractTypeEnum.supplement')
  }
]
const COLUMNS = [
  {
    title: t('components.commonTable.contractName'),
    fixed: 'left',
    // width: 280,
    ellipsis: true,
    align: 'left',
    colKey: 'name'
  },
  { title: t('components.commonTable.contractStatus'), colKey: 'status', width: 160 },
  {
    title: t('components.commonTable.contractNum'),
    width: 160,
    ellipsis: true,
    colKey: 'no'
  },
  {
    title: t('components.commonTable.contractType'),
    width: 160,
    ellipsis: true,
    colKey: 'contractType'
  },
  {
    title: t('components.commonTable.contractPayType'),
    width: 160,
    ellipsis: true,
    colKey: 'paymentType'
  },
  {
    title: t('components.commonTable.contractAmount'),
    width: 160,
    ellipsis: true,
    colKey: 'amount'
  },
  {
    align: 'left',
    fixed: 'right',
    width: 160,
    colKey: 'op',
    title: t('components.commonTable.operation')
  }
]
const list = ref<ListModel[]>([])
const loading = ref(false)
function loadData(page = 1, pageSize = 20) {
  loading.value = true
  getList({
    page,
    pageSize
  }).then((res) => {
    loading.value = false
    list.value = res.data.list
  })
}
function handlePageChange(currentPage: number, pageSize: number) {
  loadData(currentPage, pageSize)
}
loadData()
const formRef = ref<FormInstance>()
function resetForm() {
  formRef.value?.resetFields()
}
</script>
<template>
  <div class="bg-white rounded-md p-8">
    <el-form ref="formRef" :model="formData">
      <el-row :gutter="16">
        <el-col :lg="20" :md="18" :sm="18">
          <el-row :gutter="16">
            <el-col :md="8" :sm="12">
              <el-form-item :label="$t('components.commonTable.contractName')" prop="name">
                <el-input
                  v-model="formData.name"
                  :placeholder="$t('components.commonTable.contractNamePlaceholder')"
                />
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12">
              <el-form-item :label="$t('components.commonTable.contractStatus')" prop="status">
                <el-select
                  v-model="formData.status"
                  :placeholder="$t('components.commonTable.contractStatusPlaceholder')"
                  :options="CONTRACT_STATUS_OPTIONS"
                  clearable
                >
                  <el-option
                    v-for="item in CONTRACT_STATUS_OPTIONS"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12">
              <el-form-item :label="$t('components.commonTable.contractNum')" prop="no">
                <el-input
                  v-model="formData.no"
                  :placeholder="$t('components.commonTable.contractNumPlaceholder')"
                />
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12">
              <el-form-item :label="$t('components.commonTable.contractType')" prop="type">
                <el-select
                  v-model="formData.type"
                  :placeholder="$t('components.commonTable.contractTypePlaceholder')"
                  clearable
                >
                  <el-option
                    v-for="item in CONTRACT_TYPE_OPTIONS"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                /></el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :lg="4" :md="6" :sm="6" class="text-right">
          <el-button type="primary">
            {{ $t('components.commonTable.query') }}
          </el-button>
          <el-button @click="resetForm">
            {{ $t('components.commonTable.reset') }}
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table v-loading="loading" :data="list" class="mt-8" height="640">
      <el-table-column
        v-for="column in COLUMNS"
        :key="column.colKey"
        :align="column.align"
        :label="column.title"
        :width="column.width"
        :fixed="column.fixed"
        :prop="column.colKey"
      >
        <template v-if="column.title === t('pages.listBase.operation')" #default>
          <el-button type="primary" link>{{ $t('pages.listBase.detail') }}</el-button>
          <el-button type="danger" link>{{ $t('pages.listBase.delete') }}</el-button>
        </template>
        <template v-else-if="column.title === t('pages.listBase.contractStatus')" #default="scope">
          <el-tag v-if="scope.row.status === CONTRACT_STATUS.FAIL" type="danger">
            {{ $t('pages.listBase.contractStatusEnum.fail') }}
          </el-tag>
          <el-tag v-if="scope.row.status === CONTRACT_STATUS.AUDIT_PENDING" type="warning">
            {{ $t('pages.listBase.contractStatusEnum.audit') }}
          </el-tag>
          <el-tag v-if="scope.row.status === CONTRACT_STATUS.EXEC_PENDING" type="warning">
            {{ $t('pages.listBase.contractStatusEnum.pending') }}
          </el-tag>
          <el-tag v-if="scope.row.status === CONTRACT_STATUS.EXECUTING" type="success">
            {{ $t('pages.listBase.contractStatusEnum.executing') }}
          </el-tag>
          <el-tag v-if="scope.row.status === CONTRACT_STATUS.FINISH" type="success">
            {{ $t('pages.listBase.contractStatusEnum.finish') }}
          </el-tag>
        </template>
        <template v-else-if="column.title === t('pages.listBase.contractType')" #default="{ row }">
          <p v-if="row.contractType === CONTRACT_TYPES.MAIN">
            {{ $t('pages.listBase.contractStatusEnum.fail') }}
          </p>
          <p v-if="row.contractType === CONTRACT_TYPES.SUB">
            {{ $t('pages.listBase.contractStatusEnum.audit') }}
          </p>
          <p v-if="row.contractType === CONTRACT_TYPES.SUPPLEMENT">
            {{ $t('pages.listBase.contractStatusEnum.pending') }}
          </p>
        </template>
        <template v-else-if="column.colKey === 'paymentType'" #default="{ row }">
          <div
            v-if="row.paymentType === CONTRACT_PAYMENT_TYPES.PAYMENT"
            class="payment-col flex items-center"
          >
            {{ $t('pages.listBase.pay') }}<trend type="downTrend" count="" />
          </div>
          <div
            v-if="row.paymentType === CONTRACT_PAYMENT_TYPES.RECEIPT"
            class="payment-col flex items-center"
          >
            {{ $t('pages.listBase.receive') }}<trend type="upTrend" count="" />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="mt-6">
      <el-pagination
        background
        :total="100"
        layout="total, ->, sizes,prev, pager, next, jumper"
        :default-page-size="20"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>
