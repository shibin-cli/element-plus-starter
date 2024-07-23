<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import Card from '@/components/Card/Index.vue'
import type { TabsPaneContext } from 'element-plus'
import { Delete, ChatDotRound, DocumentAdd } from '@element-plus/icons-vue'

const { t } = useI18n()

const activeName = ref<'all' | 'unread' | 'read'>('all')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab.index, event)
}
const MEG_DATA = [
  {
    id: '123',
    content: '腾讯大厦一楼改造施工项目 已通过审核！',
    type: '合同动态',
    status: true,
    collected: false,
    date: '2021-01-01 08:00',
    quality: 'high'
  },
  {
    id: '124',
    content: '三季度生产原材料采购项目 开票成功！',
    type: '票务动态',
    status: true,
    collected: false,
    date: '2021-01-01 08:00',
    quality: 'low'
  },
  {
    id: '125',
    content:
      '2021-01-01 10:00的【国家电网线下签约】会议即将开始，请提前10分钟前往 会议室1 进行签到！',
    type: '会议通知',
    status: true,
    collected: false,
    date: '2021-01-01 08:00',
    quality: 'middle'
  },
  {
    id: '126',
    content: '一季度生产原材料采购项目 开票成功！',
    type: '票务动态',
    status: true,
    collected: false,
    date: '2021-01-01 08:00',
    quality: 'low'
  }
]
const messageList = ref(MEG_DATA)
const readMsg = computed(() => messageList.value.filter((item) => item.status))
const unreadMsg = computed(() => messageList.value.filter((item) => !item.status))
function setReadStatus(e: (typeof MEG_DATA)[0]) {
  messageList.value.forEach((message) => {
    if (message.id === e.id) {
      message.status = !message.status
    }
  })
}
const dialogVisible = ref(false)
const selectedItem = ref<(typeof MEG_DATA)[0] | null>(null)
function handleDelBtn(item: (typeof MEG_DATA)[0]) {
  selectedItem.value = item
  dialogVisible.value = true
}
function deleteMessage() {
  if (selectedItem.value) {
    messageList.value = messageList.value.filter((item) => item.id !== selectedItem.value?.id)
  }
  dialogVisible.value = false
}
</script>
<template>
  <card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="$t('pages.detailSecondary.all')" name="all">
        <ul>
          <li
            v-for="message in messageList"
            :key="message.id"
            class="flex items-center py-4 message-item text-sm"
            :class="{
              read: !message.status
            }"
          >
            <div>
              <el-tag v-if="message.quality === 'high'" type="danger">{{ message.type }}</el-tag>
              <el-tag v-else-if="message.quality === 'middle'" type="warning">{{
                message.type
              }}</el-tag>

              <el-tag v-else>{{ message.type }}</el-tag>
            </div>
            <div class="ml-4 message-content flex-1">{{ message.content }}</div>
            <div>
              <span class="msg-date">{{ message.date }}</span>
              <div class="message-operation">
                <el-tooltip
                  v-if="message.status"
                  effect="dark"
                  :content="$t('pages.detailSecondary.setRead')"
                  placement="top"
                >
                  <el-button :icon="DocumentAdd" link @click="setReadStatus(message)"> </el-button>
                </el-tooltip>
                <el-tooltip
                  v-if="!message.status"
                  effect="dark"
                  :content="$t('pages.detailSecondary.setUnread')"
                  placement="top"
                >
                  <el-button :icon="ChatDotRound" link @click="setReadStatus(message)"> </el-button>
                </el-tooltip>
                <el-tooltip
                  effect="dark"
                  :content="$t('pages.detailSecondary.delete')"
                  placement="top"
                >
                  <el-button :icon="Delete" link @click="handleDelBtn(message)"> </el-button>
                </el-tooltip>
              </div>
            </div>
          </li>
        </ul>
        <el-empty v-if="!messageList.length" :description="t('pages.detailSecondary.empty')" />
      </el-tab-pane>
      <el-tab-pane :label="$t('pages.detailSecondary.unread')" name="unreadMsg">
        <ul>
          <li
            v-for="message in readMsg"
            :key="message.id"
            class="flex items-center py-4 message-item text-sm"
            :class="{
              read: !message.status
            }"
          >
            <div>
              <el-tag v-if="message.quality === 'high'" type="danger">{{ message.type }}</el-tag>
              <el-tag v-else-if="message.quality === 'middle'" type="warning">{{
                message.type
              }}</el-tag>

              <el-tag v-else>{{ message.type }}</el-tag>
            </div>
            <div class="ml-4 message-content flex-1">{{ message.content }}</div>
            <div>
              <span class="msg-date">{{ message.date }}</span>
              <div class="message-operation">
                <el-tooltip
                  v-if="message.status"
                  effect="dark"
                  :content="$t('pages.detailSecondary.setRead')"
                  placement="top"
                >
                  <el-button :icon="DocumentAdd" link @click="setReadStatus(message)"> </el-button>
                </el-tooltip>
                <el-tooltip
                  v-if="!message.status"
                  effect="dark"
                  :content="$t('pages.detailSecondary.setUnread')"
                  placement="top"
                >
                  <el-button :icon="ChatDotRound" link @click="setReadStatus(message)"> </el-button>
                </el-tooltip>
                <el-tooltip
                  effect="dark"
                  :content="$t('pages.detailSecondary.delete')"
                  placement="top"
                >
                  <el-button :icon="Delete" link @click="handleDelBtn(message)"> </el-button>
                </el-tooltip>
              </div>
            </div>
          </li>
        </ul>
        <el-empty v-if="!readMsg.length" :description="t('pages.detailSecondary.empty')" />
      </el-tab-pane>
      <el-tab-pane :label="$t('pages.detailSecondary.read')" name="readMsg">
        <ul>
          <li
            v-for="message in unreadMsg"
            :key="message.id"
            class="flex items-center py-4 message-item text-sm"
            :class="{
              read: !message.status
            }"
          >
            <div>
              <el-tag v-if="message.quality === 'high'" type="danger">{{ message.type }}</el-tag>
              <el-tag v-else-if="message.quality === 'middle'" type="warning">{{
                message.type
              }}</el-tag>

              <el-tag v-else>{{ message.type }}</el-tag>
            </div>
            <div class="ml-4 message-content flex-1">{{ message.content }}</div>
            <div>
              <span class="msg-date">{{ message.date }}</span>
              <div class="message-operation">
                <el-tooltip
                  v-if="message.status"
                  effect="dark"
                  :content="$t('pages.detailSecondary.setRead')"
                  placement="top"
                >
                  <el-button :icon="DocumentAdd" link @click="setReadStatus(message)"> </el-button>
                </el-tooltip>
                <el-tooltip
                  v-if="!message.status"
                  effect="dark"
                  :content="$t('pages.detailSecondary.setUnread')"
                  placement="top"
                >
                  <el-button :icon="ChatDotRound" link @click="setReadStatus(message)"> </el-button>
                </el-tooltip>
                <el-tooltip
                  effect="dark"
                  :content="$t('pages.detailSecondary.delete')"
                  placement="top"
                >
                  <el-button :icon="Delete" link @click="handleDelBtn(message)"> </el-button>
                </el-tooltip>
              </div>
            </div>
          </li>
        </ul>
        <el-empty v-if="!unreadMsg.length" :description="t('pages.detailSecondary.empty')" />
      </el-tab-pane>
    </el-tabs>

    <el-dialog v-model="dialogVisible" title="删除通知" width="500">
      <span>确认删除通知：{{ selectedItem && selectedItem.content }}吗？</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="deleteMessage"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </card>
</template>
<style scoped lang="scss">
.message-item {
  border-bottom: 1px solid $border_color;
  @apply cursor-pointer;
  .message-operation {
    display: none;
    padding-right: 24px;
  }
  &:hover {
    background: $hover-background-color;
    .message-operation {
      display: block;
    }
    .msg-date {
      display: none;
    }
  }
  &.read {
    .message-content {
      opacity: 0.6;
    }
  }
}
</style>
