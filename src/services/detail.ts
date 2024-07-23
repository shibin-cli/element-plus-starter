import type { ProjectListResult, PurchaseListResult } from '@/types/detail'
import request from '@/utils/request'

const Api = {
  PurchaseList: '/get-purchase-list',
  ProjectList: '/get-project-list'
}

export function getPurchaseList() {
  return request.get<{ data: PurchaseListResult }>(Api.PurchaseList).then((res) => res.data)
}

export function getProjectList() {
  return request.get<{ data: ProjectListResult }>(Api.ProjectList).then((res) => res.data)
}
