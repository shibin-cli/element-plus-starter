import type { IProduct } from '@/types/list'

export const PRODUCT_LIST: IProduct[] = [
  {
    name: 'MacBook Pro 2021',
    subtitle: '苹果公司（Apple Inc. ）',
    size: '13.3 英寸',
    cpu: 'Apple M1',
    memory: 'RAM 16GB',
    info: '最高可选配 16GB 内存 · 最高可选配 2TB 存储设备 电池续航最长达 18 小时',
    use: 1420,
    stock: 1500
  },
  {
    name: 'Surface Laptop Go',
    subtitle: '微软（Microsoft Corporation）',
    size: '12.4 英寸',
    cpu: 'Core i7',
    memory: 'RAM 16GB',
    info: '常规使用 Surface，续航时间最长可达13小时 随时伴您工作',
    use: 120,
    stock: 2000
  }
]
