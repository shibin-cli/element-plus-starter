<script setup lang="ts">
import Card from '@/components/Card/Index.vue'
import { ref, onMounted } from 'vue'
import { BASE_INFO_DATA } from './constants'
import { getDateArray, getRandomArray } from '@/utils'
import { getChartListColor, type TChartColor } from '@/utils/color'
import { useI18n } from 'vue-i18n'
import { getProjectList } from '@/services/detail'
import type { ProjectInfo } from '@/types/detail'
const { t } = useI18n()
import { LIGHT_CHART_COLORS } from '@/utils/color'
import * as echarts from 'echarts'
const selectedPeriod = ref('week')
const monitorRef = ref<HTMLElement>()
let monitorChart: echarts.ECharts
onMounted(() => {
  monitorChart = echarts.init(monitorRef.value)
  monitorChart.setOption(getSmoothLineDataSet({ ...LIGHT_CHART_COLORS }))
  window.addEventListener('resize', () => {
    monitorChart.resize({
      width: monitorRef.value?.clientWidth
    })
  })
  setInterval(() => {
    monitorChart.setOption(getSmoothLineDataSet({ ...LIGHT_CHART_COLORS }))
  }, 3000)
})

let dataRef = ref<HTMLElement>()
let dataChart: echarts.ECharts
onMounted(() => {
  dataChart = echarts.init(dataRef.value)
  dataChart.setOption(get2ColBarChartDataSet({ ...LIGHT_CHART_COLORS }))
  window.addEventListener('resize', () => {
    dataChart.resize({
      width: dataRef.value?.clientWidth
    })
  })
})
const data = ref<ProjectInfo[]>([])
const list = ref<ProjectInfo[]>([])
const total = ref(0)

function loadData(page = 1, pageSize = 10) {
  if (list.value.length) {
    data.value = list.value.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
    return
  }
  getProjectList().then((res) => {
    list.value = res.data.list
    data.value = list.value.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
    total.value = res.data.list.length
  })
}
function handlePageChange(currentPage: number, pageSize: number) {
  loadData(currentPage, pageSize)
}
loadData()
const columns = [
  {
    // width: '280',
    ellipsis: true,
    colKey: 'name',
    title: t('pages.detailDeploy.projectList.table.name'),
    sorter: (a: any, b: any) => a.name.substr(10) - b.name.substr(10)
  },
  {
    // width: '280',
    ellipsis: true,
    title: t('pages.detailDeploy.projectList.table.admin'),
    colKey: 'adminName'
  },
  {
    width: '280',
    className: 'test',
    ellipsis: true,
    colKey: 'updateTime',
    title: t('pages.detailDeploy.projectList.table.createTime'),
    sorter: (a: any, b: any) => Date.parse(a.updateTime) - Date.parse(b.updateTime)
  }
  //   {
  //     align: 'left' as const,
  //     width: '200',
  //     className: 'test2',
  //     ellipsis: true,
  //     colKey: 'op',
  //     fixed: 'right' as const,
  //     title:
  //   }
]

function getSmoothLineDataSet({
  dateTime = [],
  placeholderColor,
  borderColor
}: { dateTime?: Array<string> } & TChartColor) {
  let dateArray: Array<string> = ['00:00', '02:00', '04:00', '06:00']
  if (dateTime.length > 0) {
    const divideNum = 7
    dateArray = getDateArray(dateTime, divideNum)
  }

  return {
    color: getChartListColor(),
    tooltip: {
      trigger: 'item'
    },
    grid: {
      top: '10px',
      left: '0',
      right: '20px',
      bottom: '36px',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: dateArray,
      boundaryGap: false,
      axisLabel: {
        color: placeholderColor
      },
      axisLine: {
        lineStyle: {
          color: borderColor,
          width: 1
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: placeholderColor
      },
      splitLine: {
        lineStyle: {
          color: borderColor
        }
      }
    },
    legend: {
      data: [
        t('pages.detailDeploy.deployTrend.thisMonth'),
        t('pages.detailDeploy.deployTrend.lastMonth')
      ],
      icon: 'circle',
      bottom: '0',
      itemGap: 48,
      itemHeight: 8,
      itemWidth: 8,
      textStyle: {
        fontSize: 12,
        color: placeholderColor
      }
    },
    series: [
      {
        name: t('pages.detailDeploy.deployTrend.lastMonth'),
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
        smooth: true,
        color: getChartListColor()[0],
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        areaStyle: {
          opacity: 0.1
        }
      },
      {
        name: t('pages.detailDeploy.deployTrend.thisMonth'),
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
        smooth: true,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        color: getChartListColor()[1]
      }
    ]
  }
}

const lastYearList: Array<any> = [100, 120, 140, 160, 180, 200, 210]

/**
 * 柱状图数据结构
 *
 * @export
 * @param {boolean} [isMonth=false]
 * @returns {*}
 */
function get2ColBarChartDataSet({
  isMonth = false,
  placeholderColor,
  borderColor
}: { isMonth?: boolean } & TChartColor) {
  let lastYearListCopy = lastYearList.concat([])
  let thisYearListCopy = lastYearList.concat([])

  if (isMonth) {
    lastYearListCopy = lastYearListCopy.reverse()
    thisYearListCopy = thisYearListCopy.reverse()
  }

  const data = []
  for (let i = 1; i < 7; i++) {
    data.push(t(`pages.detailDeploy.deployTrend.week${i}`))
  }

  return {
    color: getChartListColor(),
    tooltip: {
      trigger: 'item'
    },
    grid: {
      top: '10px',
      left: '0',
      right: '0',
      bottom: '36px',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data,
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          color: placeholderColor
        },
        axisLine: {
          lineStyle: {
            color: borderColor,
            width: 1
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          color: placeholderColor
        },
        splitLine: {
          lineStyle: {
            color: borderColor
          }
        }
      }
    ],
    legend: {
      data: [
        t('pages.detailDeploy.deployTrend.lastYear'),
        t('pages.detailDeploy.deployTrend.thisYear')
      ],
      bottom: '0',
      icon: 'rect',
      itemGap: 48,
      itemHeight: 4,
      itemWidth: 12,
      textStyle: {
        fontSize: 12,
        color: placeholderColor
      }
    },
    series: [
      {
        name: t('pages.detailDeploy.deployTrend.lastYear'),
        type: 'bar',
        barWidth: '30%',
        data: lastYearListCopy,
        itemStyle: {
          color: '#BCC4D0'
        }
      },
      {
        name: t('pages.detailDeploy.deployTrend.thisYear'),
        type: 'bar',
        barWidth: '30%',
        data: thisYearListCopy,
        itemStyle: {
          color: (params: { value: number }) => {
            if (params.value >= 200) {
              return getChartListColor()[1]
            }
            return getChartListColor()[0]
          }
        }
      }
    ]
  }
}

const dialogVisible = ref(false)
</script>
<template>
  <div>
    <el-row :gutter="16">
      <el-col :md="12">
        <card :title="$t('pages.detailDeploy.deployTrend.title')">
          <template #content>
            <div ref="monitorRef" style="width: 100%; height: 265px" />
          </template>
        </card>
      </el-col>
      <el-col :md="12">
        <card :title="$t('pages.detailDeploy.deployTrend.warning')">
          <template #action>
            <el-radio-group v-model="selectedPeriod">
              <el-radio-button
                :label="$t('pages.detailDeploy.deployTrend.thisWeek')"
                value="week"
              />
              <el-radio-button
                :label="$t('pages.detailDeploy.deployTrend.thisMonth')"
                value="month"
              />
            </el-radio-group>
          </template>
          <template #content>
            <div ref="dataRef" style="width: 100%; height: 265px" />
          </template>
        </card>
      </el-col>
    </el-row>
    <card class="mt-4" :title="$t('pages.detailDeploy.projectList.title')">
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
            <template v-if="column.colKey === 'adminName'" #default="{ row }">
              <span>
                {{ row.adminName }}
                <el-tag v-if="row.adminName" class="ml-2">{{ row.adminPhone }}</el-tag>
              </span>
            </template>
            <!-- <template v-else-if="column.colKey === 'purchaseNum'" #default="{ row }">
            <span>
              {{ row.pdName }}
              <el-tag v-if="row.purchaseNum > 50" type="danger" class="ml-2">超预算</el-tag>
            </span>
          </template> -->
          </el-table-column>
          <el-table-column
            :label="$t('pages.detailDeploy.projectList.table.operation')"
            :width="200"
          >
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
          <template v-if="item.type && item.type.value === 'green'">
            <span class="in-progress">{{ item.value }}</span>
          </template>
          <template v-else-if="item.type?.value === 'blue'">
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
<style scoped lang="scss">
:deep(.#{$namespace}-descriptions__content) {
  .in-progress {
    color: var(--#{$namespace}-color-success);
  }
}
</style>
