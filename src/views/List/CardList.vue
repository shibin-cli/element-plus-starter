<script setup lang="ts">
import { ref, computed } from 'vue'
import { getCardList } from '@/services/list'
import type { CardList } from '@/types/list'
import ProductCard from '@/components/ProductCard/Index.vue'
import DialogForm from './components/DialogForm.vue'
import { ElMessage } from 'element-plus'
const formDialogVisible = ref(false)
const searchValue = ref('')
const productList = ref<CardList[]>([])
const total = ref(0)

getCardList().then((res) => {
  productList.value = res.data.list
  total.value = res.data.list.length
})
const pageSize = ref(12)
const currentPage = ref(1)
function handlePageChange(current: number, size: number) {
  currentPage.value = current
  pageSize.value = size
}
const deleteProduct = ref<CardList | null>(null)
const confirmVisible = ref(false)

function handleDeleteItem(item: CardList) {
  deleteProduct.value = item
  confirmVisible.value = true
}
function onConfirmDelete() {
  ElMessage.success('删除成功')
  confirmVisible.value = false
}
</script>
<template>
  <div>
    <div class="flex items-center mb-6">
      <div class="flex-1">
        <el-button @click="formDialogVisible = true" type="primary">
          {{ $t('pages.listCard.create') }}
        </el-button>
      </div>
      <div class="w-[360px]">
        <el-input v-model="searchValue" :placeholder="$t('pages.listCard.placeholder')">
          <template #suffix>
            <el-icon class="el-input__icon"><svg-icon icon="search" /></el-icon>
          </template>
        </el-input>
      </div>
    </div>
    <dialog-form v-model="formDialogVisible" />
    <el-row :gutter="16">
      <el-col
        :xl="6"
        :md="8"
        :sm="12"
        v-for="(product, index) in productList.slice(
          pageSize * (currentPage - 1),
          pageSize * currentPage
        )"
        :key="index"
      >
        <product-card
          :product="product"
          @manage-product="formDialogVisible = true"
          @delete-product="handleDeleteItem"
        />
      </el-col>
    </el-row>
    <el-dialog v-model="confirmVisible" title="确认删除所选产品？">
      <div v-if="deleteProduct">
        {{ `确认删除后${deleteProduct.name}的所有产品信息将被清空, 且无法恢复` }}
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="confirmVisible = false">取消</el-button>
          <el-button type="primary" @click="onConfirmDelete"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
    <div class="mt-6">
      <el-pagination
        background
        :total="total"
        layout="total, ->, sizes,prev, pager, next, jumper"
        :default-page-size="12"
        :page-sizes="[12, 24, 36]"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>
