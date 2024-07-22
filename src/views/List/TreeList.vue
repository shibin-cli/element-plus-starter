<script setup lang="ts">
import { ref } from 'vue'
import FilterList from './FilterList.vue'
interface Tree {
  [key: string]: any
}
const TREE_DATA = [
  {
    label: '深圳总部',
    value: 0,
    children: [
      {
        label: '总办',
        value: '0-0'
      },
      {
        label: '市场部',
        value: '0-1',
        children: [
          {
            label: '采购1组',
            value: '0-1-0'
          },
          {
            label: '采购2组',
            value: '0-1-1'
          }
        ]
      },
      {
        label: '技术部',
        value: '0-2'
      }
    ]
  },
  {
    label: '北京总部',
    value: 1,
    children: [
      {
        label: '总办',
        value: '1-0'
      },
      {
        label: '市场部',
        value: '1-1',
        children: [
          {
            label: '采购1组',
            value: '1-1-0'
          },
          {
            label: '采购2组',
            value: '1-1-1'
          }
        ]
      }
    ]
  },
  {
    label: '上海总部',
    value: 2,
    children: [
      {
        label: '市场部',
        value: '2-0'
      },
      {
        label: '财务部',
        value: '2-1',
        children: [
          {
            label: '财务1组',
            value: '2-1-0'
          },
          {
            label: '财务2组',
            value: '2-1-1'
          }
        ]
      }
    ]
  },
  {
    label: '湖南',
    value: 3
  },
  {
    label: '湖北',
    value: 4
  }
]
const filterText = ref('')
const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}
</script>
<template>
  <div class="bg-white rounded-md p-8">
    <el-row>
      <el-col :sm="8" :xs="8" :md="4">
        <el-input v-model="filterText" :placeholder="$t('pages.listTree.placeholder')">
          <template #suffix>
            <el-icon class="el-input__icon"><svg-icon icon="search" /></el-icon>
          </template>
        </el-input>
        <el-tree :data="TREE_DATA" class="mt-6" />
      </el-col>
      <el-col :sm="16" :xs="16" :md="20">
        <filter-list class="py-0" :filter-node-method="filterNode" />
      </el-col>
    </el-row>
  </div>
</template>
