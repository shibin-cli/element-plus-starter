<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Trend from '@/components/Trend/Index.vue'

const selectedRankingPeriod = ref('week')

const { t } = useI18n()
const SALE_COLUMNS = [
  {
    align: 'left',
    ellipsis: true,
    colKey: 'productName',
    title: t('pages.dashboardBase.saleColumns.productName')
    // width: 150
  },
  {
    align: 'center',
    colKey: 'growUp',
    width: 100,
    title: t('pages.dashboardBase.saleColumns.growUp')
  },
  {
    align: 'center',
    colKey: 'count',
    title: t('pages.dashboardBase.saleColumns.count'),
    width: 100
  }
  //   {
  //     align: 'center',
  //     colKey: 'operation',
  //     title: t('pages.dashboardBase.saleColumns.operation'),
  //     width: 100,
  //     fixed: 'right'
  //   }
]
interface TendItem {
  growUp?: number
  productName: string
  count: number
  date: string
}
const BUY_TEND_LIST: Array<TendItem> = [
  {
    growUp: 1,
    productName: '腾讯科技（深圳）有限公司',
    count: 3015,
    date: '2021-09-01'
  },
  {
    growUp: -1,
    productName: '大润发有限公司',
    count: 2015,
    date: '2021-09-01'
  },
  {
    growUp: 6,
    productName: '四川海底捞股份有限公司',
    count: 1815,
    date: '2021-09-11'
  },
  {
    growUp: -3,
    productName: '索尼（中国）有限公司',
    count: 1015,
    date: '2021-09-21'
  },
  {
    growUp: -4,
    productName: '松下电器（中国）有限公司',
    count: 445,
    date: '2021-09-19'
  },
  {
    growUp: -3,
    productName: '新余市办公用户采购项目',
    count: 2015,
    date: '2021-09-12'
  }
]
</script>
<template>
  <div class="bg-white rounded-md p-8">
    <div class="flex items-center">
      <div class="flex-1">
        <div class="text-xl">
          {{ $t('pages.dashboardBase.rankList.title') }}
        </div>
      </div>
      <div>
        <el-radio-group v-model="selectedRankingPeriod">
          <el-radio-button :label="$t('pages.dashboardBase.rankList.week')" value="week" />
          <el-radio-button :label="$t('pages.dashboardBase.rankList.month')" value="month" />
        </el-radio-group>
      </div>
    </div>
    <div class="mt-6">
      <el-table :data="BUY_TEND_LIST" style="width: 100%" index>
        <el-table-column
          type="index"
          width="80"
          :label="t('pages.dashboardBase.saleColumns.index')"
        />

        <el-table-column
          v-for="column in SALE_COLUMNS"
          :key="column.colKey"
          :prop="column.colKey"
          :label="column.title"
          :width="column.width"
          :align="column.align"
        >
          <template #default="scope" v-if="column.colKey === 'growUp'">
            <Trend
              :type="scope.row.growUp > 0 ? 'upTrend' : 'downTrend'"
              :count="Math.abs(scope.row.growUp)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="100" align="center">
          <template #default>
            <el-button link type="primary" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
