<script setup lang="ts">
import { ArrowRightBold } from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import { onMounted } from 'vue'
import Trend from '@/components/Trend/Index.vue'
const PANE_LIST = [
  {
    title: 'pages.dashboardBase.topPanel.card1',
    number: '¥ 28,425.00',
    upTrend: '20.5%',
    leftType: 'echarts-line'
  },
  {
    title: 'pages.dashboardBase.topPanel.card2',
    number: '¥ 768.00',
    downTrend: '20.5%',
    leftType: 'echarts-bar'
  },
  {
    title: 'pages.dashboardBase.topPanel.card3',
    number: '1126',
    upTrend: '20.5%',
    leftType: 'icon-usergroup'
  },
  {
    title: 'pages.dashboardBase.topPanel.card4',
    number: 527,
    downTrend: '20.5%',
    leftType: 'icon-file-paste'
  }
]

function constructInitDashboardDataset(type: string) {
  const dateArray: Array<string> = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

  const datasetAxis = {
    xAxis: {
      type: 'category',
      show: false,
      data: dateArray
    },
    yAxis: {
      show: false,
      type: 'value'
    },
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  }

  if (type === 'line') {
    const lineDataset = {
      ...datasetAxis,
      color: ['#fff'],
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type,
          showSymbol: true,
          symbol: 'circle',
          symbolSize: 0,
          //   markPoint: {
          //     data: [
          //       { type: 'max', name: '最大值' },
          //       { type: 'min', name: '最小值' }
          //     ]
          //   },
          lineStyle: {
            width: 2
          }
        }
      ]
    }
    return lineDataset
  }
  const barDataset = {
    ...datasetAxis,
    series: [
      {
        data: [
          100,
          130,
          184,
          218,
          {
            value: 135,
            itemStyle: {
              opacity: 0.2
            }
          },
          {
            value: 118,
            itemStyle: {
              opacity: 0.2
            }
          },
          {
            value: 60,
            itemStyle: {
              opacity: 0.2
            }
          }
        ],
        type,
        barWidth: 9
      }
    ]
  }
  return barDataset
}
onMounted(() => {
  const moneyChart = echarts.init(document.getElementById('moneyContainer') as HTMLDivElement)
  moneyChart.setOption(constructInitDashboardDataset('line'))

  const refundChart = echarts.init(document.getElementById('refundContainer') as HTMLDivElement)
  refundChart.setOption(constructInitDashboardDataset('bar'))
})
</script>
<template>
  <el-row :gutter="16">
    <el-col v-for="(item, index) in PANE_LIST" :key="item.title" :xs="24" :sm="12" :md="12" :lg="6">
      <div class="card bg-white px-8 py-6 rounded-md mb-4" :class="{ active: index === 0 }">
        <div class="text-sm">{{ $t(item.title) }}</div>
        <div class="text-lg pt-2 mb-6 relative">
          <span>{{ item.number }}</span>
          <div
            v-if="index === 0"
            id="moneyContainer"
            class="absolute right-0 top-0 w-[120px] h-[100px]"
          ></div>
          <div
            v-if="index === 1"
            id="refundContainer"
            class="absolute right-0 bottom-0 w-[120px] h-[56px]"
          ></div>
        </div>
        <div class="text-sm flex">
          <div class="opacity-60">{{ $t('pages.dashboardBase.topPanel.cardTips') }}</div>

          <Trend v-if="item.upTrend" type="upTrend" :count="item.upTrend" class="flex-1" />
          <Trend
            v-else-if="item.downTrend"
            type="downTrend"
            :count="item.downTrend"
            class="flex-1"
          />

          <el-icon class="cursor-pointer">
            <ArrowRightBold />
          </el-icon>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<style scoped lang="scss">
.card {
  &.active {
    background-color: $primary;
    color: #fff;
    :deep(.success),
    :deep(.error) {
      color: #fff;
      // background: #fff;
      .trend-icon-wrap {
        background: #618dff;
      }
    }
  }
}
</style>
