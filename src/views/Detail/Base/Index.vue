<script setup lang="ts">
import Card from '@/components/Card/Index.vue'
import { useI18n } from 'vue-i18n'
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
    name: t('constants.contract.createDate'),
    value: '2020-12-22 10:00:00',
    type: null
  }
]
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
    <card class="mt-4" :title="$t('pages.detailBase.changelog.title')">
      <template #content>
        <el-steps direction="vertical" :active="1" finish-status="success" style="height: 250px">
          <el-step
            :title="$t('pages.detailBase.changelog.step1.title')"
            :description="$t('pages.detailBase.changelog.step1.subtitle')"
          />
          <el-step
            :title="$t('pages.detailBase.changelog.step2.title')"
            :description="$t('pages.detailBase.changelog.step2.subtitle')"
          />
          <el-step
            :title="$t('pages.detailBase.changelog.step3.title')"
            :description="$t('pages.detailBase.changelog.step3.desc')"
          />
        </el-steps>
      </template>
    </card>
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
</style>
