import type { UploadUserFile } from 'element-plus'
export const FORM_RULES = {
  name: [{ required: true, message: '请输入合同名称' }],
  type: [{ required: true, message: '请选择合同类型' }],
  payment: [{ required: true, message: '请选择合同收付类型' }],
  amount: [{ required: true, message: '请输入合同金额' }],
  partyA: [{ required: true, message: '请选择甲方' }],
  partyB: [{ required: true, message: '请选择乙方' }],
  signDate: [{ required: true, message: '请选择日期' }],
  startDate: [{ required: true, message: '请选择日期' }],
  endDate: [{ required: true, message: '请选择日期' }]
}

export const INITIAL_DATA = {
  name: '',
  type: '',
  partyA: '',
  partyB: '',
  signDate: '',
  startDate: '',
  endDate: '',
  payment: '1',
  amount: 0,
  comment: '',
  files: [] as Array<UploadUserFile>
}

export const TYPE_OPTIONS = [
  { label: 'Type A', value: '1' },
  { label: 'Type B', value: '2' },
  { label: 'Type C', value: '3' }
]

export const PARTY_A_OPTIONS = [
  { label: 'Company A', value: '1' },
  { label: 'Company B', value: '2' },
  { label: 'Company C', value: '3' }
]

export const PARTY_B_OPTIONS = [
  { label: 'Company A', value: '1' },
  { label: 'Company B', value: '2' },
  { label: 'Company C', value: '3' }
]
