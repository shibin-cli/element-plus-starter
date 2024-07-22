<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { getList } from '@/services/list'
import { ref } from 'vue'
import type { ListModel } from '@/types/list'
import Trend from '@/components/Trend/Index.vue'
const { t } = useI18n()
import { CONTRACT_STATUS, CONTRACT_TYPES, CONTRACT_PAYMENT_TYPES } from '@/utils/constants'

const loading = ref(false)
const COLUMNS = [
  // { colKey: 'row-select', type: 'multiple', width: 64, fixed: 'left' },
  {
    title: t('pages.listBase.contractName'),
    align: 'left',
    // width: 320,
    colKey: 'name',
    fixed: 'left'
  },
  { title: t('pages.listBase.contractStatus'), colKey: 'status', width: 160 },
  {
    title: t('pages.listBase.contractNum'),
    width: 160,
    ellipsis: true,
    colKey: 'no'
  },
  {
    title: t('pages.listBase.contractType'),
    width: 160,
    ellipsis: true,
    colKey: 'contractType'
  },
  {
    title: t('pages.listBase.contractPayType'),
    width: 160,
    ellipsis: true,
    colKey: 'paymentType'
  },
  {
    title: t('pages.listBase.contractAmount'),
    width: 160,
    ellipsis: true,
    colKey: 'amount'
  },
  {
    title: t('pages.listBase.operation'),
    align: 'left',
    fixed: 'right',
    width: 160,
    colKey: 'op'
  }
]
const selectedRowKeys = ref<ListModel[]>([])
const list = ref<ListModel[]>([])
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
function handleSelectionChange(selectedKeys: ListModel[]) {
  selectedRowKeys.value = selectedKeys
}
function handlePageChange(currentPage: number, pageSize: number) {
  loadData(currentPage, pageSize)
}
loadData()
</script>
<template>
  <div class="bg-white rounded-md p-8">
    <div class="flex items-center">
      <el-button type="primary">
        {{ $t('pages.listBase.create') }}
      </el-button>
      <el-button> {{ $t('pages.listBase.export') }} </el-button>
      <p class="ml-4 opacity-60 text-sm" v-if="selectedRowKeys.length">
        {{ $t('pages.listBase.select') }} {{ selectedRowKeys.length }}
        {{ $t('pages.listBase.items') }}
      </p>
      <div class="flex-1"></div>

      <div class="w-[360px]">
        <el-input :placeholder="$t('pages.listBase.placeholder')">
          <template #suffix>
            <el-icon class="el-input__icon"><svg-icon icon="search" /></el-icon>
          </template>
        </el-input>
      </div>
    </div>
    <el-table
      :data="list"
      class="mt-8"
      height="640"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column type="selection" width="64" />
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
          <el-tag type="danger" v-if="scope.row.status === CONTRACT_STATUS.FAIL">
            {{ $t('pages.listBase.contractStatusEnum.fail') }}
          </el-tag>
          <el-tag type="warning" v-if="scope.row.status === CONTRACT_STATUS.AUDIT_PENDING">
            {{ $t('pages.listBase.contractStatusEnum.audit') }}
          </el-tag>
          <el-tag type="warning" v-if="scope.row.status === CONTRACT_STATUS.EXEC_PENDING">
            {{ $t('pages.listBase.contractStatusEnum.pending') }}
          </el-tag>
          <el-tag type="success" v-if="scope.row.status === CONTRACT_STATUS.EXECUTING">
            {{ $t('pages.listBase.contractStatusEnum.executing') }}
          </el-tag>
          <el-tag type="success" v-if="scope.row.status === CONTRACT_STATUS.FINISH">
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
        <template
          v-else-if="column.title === t('pages.listBase.contractPayType')"
          #default="{ row }"
        >
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
