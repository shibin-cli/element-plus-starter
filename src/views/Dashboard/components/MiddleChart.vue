<script setup lang="ts">
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import * as echarts from 'echarts'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const currentMonth = ref('2022-01 至 20223-01')
const value1 = ref('')
function getRandomArray(num = 100): number {
  let resultNum = Number((Math.random() * num).toFixed(0))

  if (resultNum <= 1) {
    resultNum = 1
  }

  return resultNum
}
onMounted(() => {
  renderChart()
})
function renderChart() {
  const monitorContainer = document.getElementById('monitorContainer')
  const monitorChart = echarts.init(monitorContainer)
  monitorChart.setOption(getLineChartDataSet({}))

  const countContainer = document.getElementById('countContainer')
  const countChart = echarts.init(countContainer)
  countChart.setOption(getPieChartDataSet({}))
}
function getPieChartDataSet({
  radius = 42,
  textColor,
  placeholderColor,
  containerColor
}: { radius?: number } & Record<string, string>) {
  return {
    // color: getChartListColor(),
    tooltip: {
      show: false,
      trigger: 'axis',
      position: null
    },
    grid: {
      top: '0',
      right: '0'
    },
    legend: {
      selectedMode: false,
      itemWidth: 12,
      itemHeight: 4,
      textStyle: {
        fontSize: 12
        // color: placeholderColor
      },
      left: 'center',
      bottom: '0',
      orient: 'horizontal' // legend 横向布局。
    },
    series: [
      {
        name: '销售渠道',
        type: 'pie',
        radius: ['48%', '60%'],
        avoidLabelOverlap: true,
        selectedMode: true,
        silent: true,
        itemStyle: {
          //   borderColor: containerColor,
          borderWidth: 1
        },
        label: {
          show: true,
          position: 'center',
          formatter: ['{value|{d}%}', '{name|{b}}'].join('\n'),
          rich: {
            value: {
              //   color: textColor,
              fontSize: 28,
              fontWeight: 'normal',
              lineHeight: 46
            },
            name: {
              color: '#909399',
              fontSize: 12,
              lineHeight: 14
            }
          }
        },
        emphasis: {
          scale: true,
          label: {
            show: false,
            rich: {
              value: {
                // color: textColor,
                fontSize: 28,
                fontWeight: 'normal',
                lineHeight: 46
              },
              name: {
                color: '#909399',
                fontSize: 14,
                lineHeight: 14
              }
            }
          }
        },
        labelLine: {
          show: true
        },
        data: [
          {
            value: 1048,
            name: '线上'
          },
          { value: radius * 7, name: '门店' }
        ]
      }
    ]
  }
}

function getLineChartDataSet({
  dateTime = [],
  placeholderColor,
  borderColor
}: { dateTime?: Array<string> } & Record<string, string>) {
  const divideNum = 10
  const timeArray = []
  const inArray = []
  const outArray = []
  for (let i = 0; i < divideNum; i++) {
    if (dateTime.length > 0) {
      const dateAbsTime: number =
        (new Date(dateTime[1]).getTime() - new Date(dateTime[0]).getTime()) / divideNum
      const enhandTime: number = new Date(dateTime[0]).getTime() + dateAbsTime * i
      // console.log('dateAbsTime..', dateAbsTime, enhandTime);
      timeArray.push(dayjs(enhandTime).format('MM-DD'))
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

  const dataSet = {
    tooltip: {
      trigger: 'item'
    },
    grid: {
      left: '0',
      right: '20px',
      top: '5px',
      bottom: '36px',
      containLabel: true
    },
    legend: {
      left: 'center',
      bottom: '0',
      orient: 'horizontal', // legend 横向布局。
      data: ['本月', '上月'],
      textStyle: {
        fontSize: 12
        // color: placeholderColor
      }
    },
    xAxis: {
      type: 'category',
      data: timeArray,
      boundaryGap: false,
      axisLabel: {
        // color: placeholderColor
      },
      axisLine: {
        lineStyle: {
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
    series: [
      {
        name: '本月',
        data: outArray,
        type: 'line',
        smooth: false,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          //   borderColor,
          borderWidth: 1
        },
        areaStyle: {
          opacity: 0.1
        }
      },
      {
        name: '上月',
        data: inArray,
        type: 'line',
        smooth: false,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          //   borderColor,
          borderWidth: 1
        }
      }
    ]
  }
  return dataSet
}
window.onresize = () => {
  const monitorContainer = document.getElementById('monitorContainer')
  const monitorChart = echarts.init(monitorContainer)
  monitorChart.resize()

  const countContainer = document.getElementById('countContainer')
  const countChart = echarts.init(countContainer)
  countChart.resize()
}
</script>
<template>
  <el-row :gutter="16">
    <el-col :md="24" :lg="18" class="mb-4">
      <div class="bg-white rounded-md p-8">
        <div class="flex items-center">
          <div class="flex-1">
            <div class="text-xl">
              {{ $t('pages.dashboardBase.topPanel.analysis.title') }}
            </div>
            <div class="text-sm opacity-60">{{ currentMonth }}</div>
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
        <div id="monitorContainer" class="w-full h-[300px] mt-8"></div>
      </div>
    </el-col>
    <el-col :md="24" :lg="6" class="mb-4">
      <div class="bg-white rounded-md p-8">
        <div class="flex items-center">
          <div class="flex-1">
            <div class="text-xl">
              {{ $t('pages.dashboardBase.topPanel.analysis.title') }}
            </div>
            <div class="text-sm opacity-60">{{ currentMonth }}</div>
          </div>
        </div>
        <div id="countContainer" class="w-full h-[300px] mt-8"></div>
      </div>
    </el-col>
  </el-row>
</template>
