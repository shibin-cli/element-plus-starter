import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const collapse = ref(false)
  const lang = ref('zh-cn')

  return { collapse, lang }
})
export default useThemeStore
