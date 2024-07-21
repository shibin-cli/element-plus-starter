<script lang="ts" setup>
import { ref, onMounted, watch, nextTick, onActivated } from 'vue'
import Card from '@/components/Card/Index.vue'
import { MoreFilled } from '@element-plus/icons-vue'
import { USER_INFO_LIST } from '@/utils/constants'
import * as echarts from 'echarts'
import { useI18n } from 'vue-i18n'
import { getDateArray, getRandomArray } from '@/utils'
import Contact from '@/components/Contact/Index.vue'
import { TEAM_MEMBERS } from '@/utils/constants'
const activeName = ref('first')
const value1 = ref('')
const PRODUCT_LIST = ['a', 'b', 'c', 'd']

const { t } = useI18n()
const lineRef = ref<HTMLElement>()
let lineChart: echarts.ECharts
const renderLineChart = () => {
  if (!lineRef.value) return
  lineChart = echarts.init(lineRef.value)
  lineChart.setOption(getFolderLineDataSet({}))
}
watch(activeName, () => {
  nextTick(() => {
    lineChart.resize({
      width: lineRef.value?.clientWidth
    })
  })
})
onMounted(() => {
  renderLineChart()
})
window.addEventListener('resize', () => {
  if (!lineChart) return
  if (lineRef.value) {
    lineChart.resize({
      width: lineRef.value?.clientWidth
    })
  }
})
onActivated(() => {
  lineChart.resize({
    width: lineRef.value?.clientWidth
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
</script>
<template>
  <el-row :gutter="16">
    <el-col :lg="18" class="mb-4">
      <div class="bg-white rounded-md p-8 flex mb-4">
        <div class="flex-1">
          <span class="text-2xl opacity-80">Hi，Image</span>
          <span class="text-sm ml-5 opacity-70"> {{ $t('pages.user.markDay') }}</span>
        </div>
        <div>
          <img src="@/assets/img/assets-tencent-logo.png" class="w-[168px]" />
        </div>
      </div>
      <!-- <div class="bg-white rounded-md p-8 flex mt-4"></div> -->
      <card :title="$t('pages.user.personalInfo.title')" class="mt-4">
        <template #action>
          <el-button :icon="MoreFilled" text />
        </template>
        <template #content>
          <div></div>
          <el-descriptions title="" direction="vertical" :column="4">
            <el-descriptions-item
              v-for="(item, index) in USER_INFO_LIST"
              :key="index"
              :label="$t(item.title)"
              :labelStyle="{
                opacity: '.6'
              }"
              :contentStyle="{
                opacity: '.6'
              }"
              labelClassName="opacity-60"
            >
              {{ item.content }}
            </el-descriptions-item>
            <!-- <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
            <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
            <el-descriptions-item label="备注">
              <el-tag size="small">学校</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="联系地址"
              >江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item -->
            <!-- > -->
          </el-descriptions>
        </template>
      </card>
      <div class="bg-white rounded-md p-8 flex mt-4">
        <el-tabs v-model="activeName" class="w-full">
          <el-tab-pane label="用户管理" name="first" lazy>
            <card :title="$t('pages.user.visitData')" class="px-0">
              <template #action>
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="To"
                  start-placeholder="Start date"
                  end-placeholder="End date"
                />
              </template>
              <template #content>
                <div ref="lineRef" class="mt-6" style="width: 100%; height: 328px" />
              </template>
            </card>
          </el-tab-pane>
          <el-tab-pane label="配置管理" name="second" lazy>配置管理</el-tab-pane>
          <el-tab-pane label="角色管理" name="third" lazy>角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth" lazy>定时任务补偿</el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
    <el-col :lg="6">
      <div class="bg-[#0052d9] rounded-md p-8">
        <div>
          <el-avatar :size="80"><span class="text-3xl">T</span></el-avatar>
        </div>
        <div class="mt-8 text-white opacity-90">
          <div class="text-xl">My Account</div>
          <div class="mt-2 text-sm">{{ $t('pages.user.personalInfo.position') }}</div>
        </div>
      </div>
      <card class="mt-4" :title="$t('pages.user.teamMember')">
        <template #action>
          <el-button :icon="MoreFilled" text />
        </template>
        <template #content>
          <contact v-for="(item, index) in TEAM_MEMBERS" :key="item.title" v-bind="{ ...item }" />
        </template>
      </card>
      <card class="mt-4" :title="$t('pages.user.serviceProduction')">
        <template #action>
          <el-button :icon="MoreFilled" text />
        </template>
        <template #content>
          <el-row>
            <el-col :span="6" v-for="item in PRODUCT_LIST" :key="item">
              <el-avatar>{{ item.toUpperCase() }}</el-avatar>
            </el-col>
          </el-row>
        </template>
      </card>
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped>
:deep(.#{$namespace}-descriptions__content:not(.is-bordered-label)) {
  color: var(--#{$namespace}-text-color-primary);
}
</style>
