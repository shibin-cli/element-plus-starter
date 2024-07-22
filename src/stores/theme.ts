import { ref } from 'vue'
import { defineStore } from 'pinia'
const WIDTH = 992
export const useThemeStore = defineStore('theme', () => {
  const collapse = ref(isMobile())
  const lang = ref('zh-cn')
  const device = ref<'mobile' | 'desktop'>('desktop')

  window.addEventListener('resize', () => {
    device.value = isMobile() ? 'mobile' : 'desktop'
    collapse.value = isMobile()
  })
  function isMobile() {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }
  return { collapse, lang }
})
export default useThemeStore
