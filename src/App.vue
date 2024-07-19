<script setup lang="ts">
import { computed, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import useThemeStore from '@/stores/theme'
import 'dayjs/locale/zh-cn'
import { ElConfigProvider } from 'element-plus'

const store = useThemeStore()

const locale = computed(() => (store.lang === 'zh-cn' ? zhCn : en))
interface User {
  date: string
  name: string
  address: string
}

const search = ref('')
const filterTableData = computed(() =>
  tableData.filter(
    (data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

const tableData: User[] = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'John',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Morgan',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
</script>

<template>
  <!-- <div class="p-5">
  <el-table :data="filterTableData" style="width: 100%" border>
    <el-table-column label="Date" prop="date" />
    <el-table-column label="Name" prop="name" >
      <template #header>
        <div class="flex">
          <div class="flex-1">Name</div>
          <el-dropdown :hide-on-click="false" placement="bottom-end">
            <el-button link :icon="Search"></el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-input v-model="search"  placeholder="Name to search" />
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>
    </el-table-column>
    <el-table-column>
      
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"> Edit </el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
 </div> -->
  <div>
    <el-config-provider namespace="you" :locale="locale">
      <router-view />
    </el-config-provider>
  </div>
</template>
