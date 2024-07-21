<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getRandomArray, LAST_7_DAYS } from '@/utils'
import * as echarts from 'echarts'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import Trend from '@/components/Trend/Index.vue'

const value1 = ref('')
const { t } = useI18n()
onMounted(() => {
  renderCharts()
})
let stokeChart: echarts.ECharts, stokeContainer: HTMLDivElement
function renderCharts() {
  stokeContainer = document.getElementById('stokeContainer') as HTMLDivElement
  stokeChart = echarts.init(stokeContainer)
  stokeChart.setOption(constructInitDataset({ dateTime: LAST_7_DAYS }))
}

function constructInitDataset({ dateTime = [] }: { dateTime: Array<string> }) {
  const divideNum = 10
  const timeArray = []
  const inArray = []
  const outArray = []
  for (let i = 0; i < divideNum; i++) {
    if (dateTime.length > 0) {
      const dateAbsTime: number =
        (new Date(dateTime[1]).getTime() - new Date(dateTime[0]).getTime()) / divideNum
      const enhandTime: number = new Date(dateTime[0]).getTime() + dateAbsTime * i
      timeArray.push(dayjs(enhandTime).format('YYYY-MM-DD'))
    } else {
      timeArray.push(
        dayjs()
          .subtract(divideNum - i, 'day')
          .format('YYYY-MM-DD')
      )
    }

    inArray.push(getRandomArray().toString())
    outArray.push(getRandomArray().toString())
  }

  const dataset = {
    // color: getChartListColor(),
    tooltip: {
      trigger: 'item'
    },
    xAxis: {
      type: 'category',
      data: timeArray,
      axisLabel: {
        // color: placeholderColor
      },
      axisLine: {
        lineStyle: {
          //   color: getChartListColor()[1],
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
          //   color: borderColor
        }
      }
    },
    grid: {
      top: '5%',
      left: '25px',
      right: 0,
      bottom: '60px'
    },
    legend: {
      icon: 'rect',
      itemWidth: 12,
      itemHeight: 4,
      itemGap: 48,
      textStyle: {
        fontSize: 12
        // color: placeholderColor
      },
      left: 'center',
      bottom: '0',
      orient: 'horizontal',
      data: [t('pages.dashboardBase.chart.thisMonth'), t('pages.dashboardBase.chart.lastMonth')]
    },
    series: [
      {
        name: t('pages.dashboardBase.chart.thisMonth'),
        data: outArray,
        type: 'bar'
      },
      {
        name: t('pages.dashboardBase.chart.lastMonth'),
        data: inArray,
        type: 'bar'
      }
    ]
  }

  return dataset
}

window.addEventListener('resize', () => {
  stokeChart.resize({
    width: stokeContainer.clientWidth
  })
})
</script>
<template>
  <div class="bg-white rounded-md p-8">
    <el-row :gutter="16">
      <el-col :md="24" :lg="18">
        <div class="flex items-center flex-wrap">
          <div class="flex-1">
            <div class="text-xl text-nowrap">
              {{ $t('pages.dashboardBase.outputOverview.title') }}
            </div>
            <div class="text-sm opacity-60">
              {{ $t('pages.dashboardBase.outputOverview.subtitle') }}
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
          <div id="stokeContainer" class="mt-8 w-full h-[351px]"></div>
        </div>
      </el-col>
      <el-col :md="24" :lg="6" class="">
        <div class="text-right"><el-button type="primary">导出数据</el-button></div>
        <el-row>
          <el-col :sm="12" :lg="24">
            <div class="mt-12 pl-6">
              <div class="text-sm opacity-60 mb-3">
                {{ $t('pages.dashboardBase.outputOverview.month.output') }}
              </div>
              <div class="text-3xl">1726</div>
              <div class="flex items-center mt-6">
                <div class="text-sm opacity-60">
                  {{ $t('pages.dashboardBase.outputOverview.since') }}
                </div>
                <Trend type="downTrend" count="20.3%" />
              </div>
            </div>
          </el-col>
          <el-col :sm="12" :lg="24">
            <div class="pl-6 mt-12">
              <div class="text-sm opacity-60 mb-3">
                {{ $t('pages.dashboardBase.outputOverview.month.output') }}
              </div>
              <div class="text-3xl">200</div>
              <div class="flex items-center mt-6">
                <div class="text-sm opacity-60">
                  {{ $t('pages.dashboardBase.outputOverview.since') }}
                </div>
                <Trend type="downTrend" count="20.3%" />
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
