<script setup lang="ts">
import Card from '@/components/Card/Index.vue'
import { ref } from 'vue'
import Product from './components/Product.vue'
import { PRODUCT_LIST } from './constants'
import { getPurchaseList } from '@/services/detail'
import { useI18n } from 'vue-i18n'
import type { PurchaseInfo } from '@/types/detail'
const { t } = useI18n()
const BASE_INFO_DATA = [
  {
    name: t('constants.contract.name'),
    value: '总部办公用品采购项目',
    type: null
  },
  {
    name: t('constants.contract.status'),
    value: '履行中',
    type: {
      key: 'contractStatus',
      value: 'inProgress'
    }
  },
  {
    name: t('constants.contract.num'),
    value: 'BH00010',
    type: null
  },
  {
    name: t('constants.contract.type'),
    value: t('constants.contract.typeOptions.main'),
    type: null
  },
  {
    name: t('constants.contract.payType'),
    value: t('constants.contract.pay'),
    type: null
  },
  {
    name: t('constants.contract.amount'),
    value: '¥ 5,000,000',
    type: null
  },
  {
    name: t('constants.contract.company'),
    value: '腾讯科技（深圳）有限公司',
    type: null
  },
  {
    name: t('constants.contract.employee'),
    value: '欧尚',
    type: null
  },
  {
    name: t('constants.contract.signDate'),
    value: '2020-12-20',
    type: null
  },
  {
    name: t('constants.contract.effectiveDate'),
    value: '2021-01-20',
    type: null
  },
  {
    name: t('constants.contract.endDate'),
    value: '2022-12-20',
    type: null
  },
  {
    name: t('constants.contract.attachment'),
    value: '总部办公用品采购项目合同.pdf',
    type: {
      key: 'contractAnnex',
      value: 'pdf'
    }
  },
  {
    name: t('constants.contract.remark'),
    value: '--',
    type: null
  },
  {
    name: t('constants.contract.createDate'),
    value: '2020-12-22 10:00:00',
    type: null
  }
]
const columns = [
  {
    width: 280,
    ellipsis: true,
    colKey: 'index',
    title: t('pages.detailCard.detail.form.applyNo'),
    sorter: (a: any, b: any) => a.index.substr(3) - b.index.substr(3)
  },
  {
    // width: 200,
    ellipsis: true,
    colKey: 'pdName',
    title: t('pages.detailCard.detail.form.product'),
    sorter: (a: any, b: any) => a.pdName.length - b.pdName.length
  },
  {
    width: 200,
    ellipsis: true,
    colKey: 'pdNum',
    title: t('pages.detailCard.detail.form.productNo')
  },
  {
    width: 200,
    ellipsis: true,
    colKey: 'purchaseNum',
    title: t('pages.detailCard.detail.form.num'),
    sorter: (a: any, b: any) => a.purchaseNum - b.purchaseNum
  },
  {
    width: 160,
    ellipsis: true,
    colKey: 'adminName',
    title: t('pages.detailCard.detail.form.department')
  },
  {
    width: 200,
    ellipsis: true,
    colKey: 'updateTime',
    title: t('pages.detailCard.detail.form.createTime'),
    sorter: (a: any, b: any) => Date.parse(a.updateTime) - Date.parse(b.updateTime)
  }
  //   {
  //     align: 'left' as const,
  //     fixed: 'right' as const,
  //     width: 200,
  //     className: 'test2',
  //     colKey: 'op',
  //     title: t('pages.detailCard.detail.form.operation')
  //   }
]
const selectedProductPeriod = ref('quarter')
const data = ref<PurchaseInfo[]>([])
const total = ref(0)
const list = ref<PurchaseInfo[]>([])
function loadData(page = 1, pageSize = 10) {
  console.log(page, pageSize)
  console.log((page - 1) * pageSize, pageSize)
  if (list.value.length) {
    data.value = list.value.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
    return
  }
  getPurchaseList().then((res) => {
    list.value = res.data.list
    data.value = list.value.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
    total.value = res.data.list.length
  })
}
function handlePageChange(currentPage: number, pageSize: number) {
  loadData(currentPage, pageSize)
}
loadData()

const dialogVisible = ref(false)
</script>
<template>
  <div>
    <card :title="$t('pages.detailBase.baseInfo.title')">
      <template #content>
        <el-descriptions :column="2">
          <el-descriptions-item
            v-for="(item, index) in BASE_INFO_DATA"
            :key="index"
            :label="item.name"
            label-class-name="opacity-60 xs:w-[80px] sm:w-[80px] md:w-[160px] inline-block "
          >
            <template v-if="item.type && item.type.value === 'inProgress'">
              <span class="in-progress"><i />{{ item.value }}</span>
            </template>
            <template v-else-if="item.type?.key === 'contractAnnex'">
              <el-button type="primary" link> {{ item.value }}</el-button>
            </template>
            <template v-else>
              {{ item.value }}
            </template>
          </el-descriptions-item>
        </el-descriptions>
      </template>
    </card>
    <card class="mt-4" :title="$t('pages.detailCard.invoice.title')">
      <template #content>
        <el-steps :active="1" finish-status="success">
          <el-step
            :title="$t('pages.detailCard.invoice.step1.title')"
            :description="$t('pages.detailCard.invoice.step1.content')"
          />
          <el-step
            :title="$t('pages.detailCard.invoice.step2.title')"
            :description="$t('pages.detailCard.invoice.step2.content')"
          />
          <el-step
            :title="$t('pages.detailCard.invoice.step3.title')"
            :description="$t('pages.detailCard.invoice.step3.content')"
          />
          <el-step :title="$t('pages.detailCard.invoice.step4.title')" />
        </el-steps>
      </template>
    </card>
    <card class="mt-4" :title="$t('pages.detailCard.product.title')">
      <template #action>
        <el-radio-group v-model="selectedProductPeriod">
          <el-radio-button :label="$t('pages.detailCard.product.quarter')" value="quarter" />
          <el-radio-button :label="$t('pages.detailCard.product.month')" value="month" />
        </el-radio-group>
      </template>
      <template #content>
        <el-row :gutter="16">
          <el-col :lg="8" class="rounded-md add-product mb-4">
            <div class="flex justify-center items-center">
              <div>
                <el-avatar :size="56" class="mt-4 cursor-pointer">
                  <svg-icon icon="add" class="inline-block" />
                </el-avatar>
                <p class="text-sm opacity-60 mt-6">
                  {{ $t('pages.detailCard.product.add') }}
                </p>
              </div>
            </div>
          </el-col>
          <el-col v-for="(item, index) in PRODUCT_LIST" :key="index" :lg="8" class="rounded-md">
            <product :product="item" />
          </el-col>
        </el-row>
      </template>
    </card>
    <card class="mt-4" :title="$t('pages.detailCard.detail.title')">
      <template #content>
        <el-table :data="data" stripe size="large" style="height: 528px">
          <el-table-column
            v-for="(column, index) in columns"
            :key="index"
            :prop="column.colKey"
            :label="column.title"
            :width="column.width"
            :sortable="!!column.sorter"
            :sort-method="column.sorter"
          >
            <template v-if="column.colKey === 'pdName'" #default="{ row }">
              <span>
                {{ row.pdName }}
                <el-tag v-if="row.pdType" class="ml-2">{{ row.pdType }}</el-tag>
              </span>
            </template>
            <template v-else-if="column.colKey === 'purchaseNum'" #default="{ row }">
              <span>
                {{ row.pdName }}
                <el-tag v-if="row.purchaseNum > 50" type="danger" class="ml-2">超预算</el-tag>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" :width="200">
            <template #default>
              <el-button link type="primary" @click="dialogVisible = true">
                {{ t('pages.detailCard.detail.form.manage') }}
              </el-button>
              <el-button link type="danger">
                {{ t('pages.detailCard.detail.form.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="mt-6">
          <el-pagination
            background
            :total="total"
            layout="total, ->, sizes,prev, pager, next, jumper"
            :default-page-size="10"
            @change="handlePageChange"
          />
        </div>
      </template>
    </card>
    <el-dialog v-model="dialogVisible" :title="$t('pages.detailCard.baseInfo.title')" width="500">
      <el-descriptions :column="1" class="px-4">
        <el-descriptions-item
          v-for="(item, index) in BASE_INFO_DATA"
          :key="index"
          :label="item.name"
          label-class-name="opacity-60 w-[84px]  inline-block"
        >
          <template v-if="item.type && item.type.value === 'inProgress'">
            <span class="in-progress"><i />{{ item.value }}</span>
          </template>
          <template v-else-if="item.type?.key === 'contractAnnex'">
            <el-button type="primary" link> {{ item.value }}</el-button>
          </template>
          <template v-else>
            {{ item.value }}
          </template>
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
:deep(.#{$namespace}-descriptions__content) {
  color: var(--#{$namespace}-text-color-primary);
  vertical-align: top;
}
:deep(
    .#{$namespace}-descriptions__body
      .#{$namespace}-descriptions__table:not(.is-bordered)
      .#{$namespace}-descriptions__cell
  ) {
  @apply pb-6;
}
:deep(.#{$namespace}-descriptions__content) {
  i {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--#{$namespace}-color-success);
    margin-right: 4px;
  }

  .in-progress {
    color: var(--#{$namespace}-color-success);
  }
}
.add-product {
  & > div {
    height: 240px;

    border: 1px dashed $border-color;
  }
}
</style>
