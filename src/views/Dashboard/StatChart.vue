<script setup lang="ts">
import { PANE_LIST_DATA, PRODUCT_LIST } from '@/utils/constants'
import { getDateArray, getRandomArray } from '@/utils'
import Trend from '@/components/Trend/Index.vue'
import { ArrowRightBold } from '@element-plus/icons-vue'
import ProductCard from '@/components/ProductCard/Index.vue'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import Card from '@/components/Card/Index.vue'
const value1 = ref('')
const value2 = ref('')

const { t } = useI18n()
let lineContainer: HTMLDivElement
let lineChart: echarts.ECharts
const renderLineChart = () => {
  lineContainer = document.getElementById('lineContainer') as HTMLDivElement
  lineChart = echarts.init(lineContainer)
  lineChart.setOption(getFolderLineDataSet({}))
}

let scatterContainer: HTMLDivElement
let scatterChart: echarts.ECharts
const renderScatterChart = () => {
  scatterContainer = document.getElementById('scatterContainer') as HTMLDivElement
  scatterChart = echarts.init(scatterContainer)
  scatterChart.setOption(getScatterDataSet({}))
}
onMounted(() => {
  renderLineChart()
  renderScatterChart()
  window.addEventListener('resize', () => {
    lineChart.resize({
      width: lineContainer.clientWidth
    })
    scatterChart.resize({
      width: scatterContainer.clientWidth
    })
  })
})
function getFolderLineDataSet({
  dateTime = []
  // placeholderColor,
  // borderColor,
}: {
  dateTime?: Array<string>
}) {
  let dateArray = []
  for (let i = 1; i < 7; i++) {
    dateArray.push(t(`pages.dashboardDetail.chart.week${i}`))
  }
  if (dateTime.length > 0) {
    const divideNum = 7
    dateArray = getDateArray(dateTime, divideNum)
  }
  return {
    // color: getChartListColor(),
    grid: {
      top: '5%',
      right: '10px',
      left: '30px',
      bottom: '60px'
    },
    legend: {
      left: 'center',
      bottom: '0',
      orient: 'horizontal', // legend 横向布局。
      data: [
        t(`pages.dashboardDetail.procurement.goods.cup`),
        t(`pages.dashboardDetail.procurement.goods.tea`),
        t(`pages.dashboardDetail.procurement.goods.honey`),
        t(`pages.dashboardDetail.procurement.goods.flour`)
      ],
      textStyle: {
        fontSize: 12
        // color: placeholderColor
      }
    },
    xAxis: {
      type: 'category',
      data: dateArray,
      boundaryGap: false,
      axisLabel: {
        // color: placeholderColor
      },
      axisLine: {
        lineStyle: {
          // color: borderColor,
          width: 1
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        // color: placeholderColor
      },
      splitLine: {
        lineStyle: {
          // color: borderColor
        }
      }
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        name: t(`pages.dashboardDetail.procurement.goods.cup`),
        stack: '总量',
        data: [
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray()
        ],
        type: 'line',
        itemStyle: {
          // borderColor,
          borderWidth: 1
        }
      },
      {
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        name: t(`pages.dashboardDetail.procurement.goods.tea`),
        stack: '总量',
        data: [
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray()
        ],
        type: 'line',
        itemStyle: {
          // borderColor,
          borderWidth: 1
        }
      },
      {
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        name: t(`pages.dashboardDetail.procurement.goods.honey`),
        stack: '总量',
        data: [
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray()
        ],
        type: 'line',
        itemStyle: {
          // borderColor,
          borderWidth: 1
        }
      },
      {
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        name: t(`pages.dashboardDetail.procurement.goods.flour`),
        stack: '总量',
        data: [
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray()
        ],
        type: 'line',
        itemStyle: {
          // borderColor,
          borderWidth: 1
        }
      }
    ]
  }
}

/**
 * 散点图数据
 *
 * @export
 * @returns {}
 */
function getScatterDataSet({
  dateTime = []
  // placeholderColor,
  // borderColor,
}: {
  dateTime?: Array<string>
}) {
  const divideNum = 40
  const timeArray = []
  const inArray = []
  const outArray = []
  for (let i = 0; i < divideNum; i++) {
    // const [timeArray, inArray, outArray] = dataset;
    if (dateTime.length > 0) {
      const dateAbsTime: number =
        (new Date(dateTime[1]).getTime() - new Date(dateTime[0]).getTime()) / divideNum
      const endTime: number = new Date(dateTime[0]).getTime() + dateAbsTime * i
      timeArray.push(dayjs(endTime).format('MM-DD'))
    } else {
      timeArray.push(
        dayjs()
          .subtract(divideNum - i, 'day')
          .format('MM-DD')
      )
    }

    inArray.push(getRandomArray().toString())
    outArray.push(getRandomArray().toString())
  }

  return {
    // color: getChartListColor(),
    xAxis: {
      data: timeArray,
      axisLabel: {
        // color: placeholderColor,
      },
      splitLine: { show: false },
      axisLine: {
        lineStyle: {
          // color: borderColor,
          width: 1
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        // color: placeholderColor,
      },
      nameTextStyle: {
        padding: [0, 0, 0, 60]
      },
      axisTick: {
        show: false,
        axisLine: {
          show: false
        }
      },
      axisLine: {
        show: false
      },
      splitLine: {
        lineStyle: {
          // color: borderColor,
        }
      }
    },
    tooltip: {
      trigger: 'item'
    },
    grid: {
      top: '5px',
      left: '25px',
      right: '5px',
      bottom: '60px'
    },
    legend: {
      left: 'center',
      bottom: '0',
      orient: 'horizontal', // legend 横向布局。
      data: [
        t(`pages.dashboardDetail.procurement.goods.massageMachine`),
        t(`pages.dashboardDetail.procurement.goods.coffeeMachine`)
      ],
      itemHeight: 8,
      itemWidth: 8,
      textStyle: {
        fontSize: 12
        // color: placeholderColor,
      }
    },
    series: [
      {
        name: t(`pages.dashboardDetail.procurement.goods.massageMachine`),
        symbolSize: 10,
        data: outArray.reverse(),
        type: 'scatter'
      },
      {
        name: t(`pages.dashboardDetail.procurement.goods.coffeeMachine`),
        symbolSize: 10,
        data: inArray.concat(inArray.reverse()),
        type: 'scatter'
      }
    ]
  }
}
</script>
<template>
  <div class="bg-white rounded-md p-8">
    <div class="flex items-center">
      <div class="flex-1">
        <div class="text-xl">{{ $t('pages.dashboardDetail.topPanel.title') }}</div>
        <el-row :gutter="16" class="mt-6">
          <el-col
            v-for="item in PANE_LIST_DATA"
            :key="item.title"
            :sm="12"
            :md="12"
            :lg="6"
            class="mb-4"
          >
            <div class="p-6 card rounded-md">
              <div class="text-sm opacity-60 mb-3">
                {{ item.title }}
              </div>
              <div class="text-3xl">{{ item.number }}</div>
              <div class="flex items-center text-sm">
                <div class="opacity-60">
                  {{ $t('pages.dashboardDetail.topPanel.quarter') }}
                </div>
                <trend
                  :type="item.upTrend ? 'upTrend' : 'downTrend'"
                  :count="item.upTrend ? item.upTrend : (item.downTrend as string)"
                  class="flex-1"
                />
                <el-icon class="cursor-pointer opacity-60">
                  <ArrowRightBold />
                </el-icon>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
  <el-row class="mt-4" :gutter="16">
    <el-col :lg="18" class="mb-4">
      <div class="bg-white rounded-md p-8">
        <div class="flex items-center flex-wrap">
          <div class="flex-1">
            <div class="text-xl text-nowrap">
              {{ $t('pages.dashboardDetail.procurement.title') }}
            </div>
          </div>
          <div>
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
            />
          </div>
        </div>
        <div id="lineContainer" class="mt-6" style="width: 100%; height: 416px" />
      </div>
    </el-col>
    <el-col :lg="6">
      <product-card v-for="(item, index) in PRODUCT_LIST" :key="index" :product="item" />
    </el-col>
  </el-row>
  <card :title="$t('pages.dashboardDetail.satisfaction.title')">
    <template #action>
      <div class="flex items-center">
        <el-date-picker
          v-model="value2"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
        />
        <div class="text-right ml-2">
          <el-button type="primary">{{
            $t('pages.dashboardDetail.satisfaction.export')
          }}</el-button>
        </div>
      </div>
    </template>
    <template #content>
      <div id="scatterContainer" class="mt-6" style="width: 100%; height: 434px" />
    </template>
  </card>
</template>
<style scoped lang="scss">
.card {
  border: 1px solid $border-color;
}
</style>
