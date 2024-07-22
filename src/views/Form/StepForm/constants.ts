export const FORM_RULES = {
  name: [{ required: true }],
  type: [{ required: true }],
  title: [{ required: true }],
  taxNum: [{ required: true }],
  consignee: [{ required: true }],
  mobileNum: [{ required: true }],
  deliveryAddress: [{ required: true }],
  fullAddress: [{ required: true }]
}

export const NAME_OPTIONS = [
  { label: 'A', value: '1' },
  { label: 'B', value: '2' },
  { label: 'C', value: '3' }
]

export const TYPE_OPTIONS = [
  { label: 'Type A', value: '1' },
  { label: 'Type B', value: '2' },
  { label: 'Type C', value: '3' }
]

export const ADDRESS_OPTIONS = [
  { label: '广东省深圳市南山区', value: '1' },
  { label: '北京市海淀区', value: '2' },
  { label: '上海市徐汇区', value: '3' },
  { label: '四川省成都市高新区', value: '4' },
  { label: '广东省广州市天河区', value: '5' },
  { label: '陕西省西安市高新区', value: '6' }
]

export const INITIAL_DATA1 = {
  name: '',
  type: ''
}

export const INITIAL_DATA2 = {
  title: '',
  taxNum: '',
  address: '',
  bank: '',
  bankAccount: '',
  email: '',
  tel: ''
}

export const INITIAL_DATA3 = {
  consignee: '',
  mobileNum: '',
  deliveryAddress: '',
  fullAddress: ''
}
