import type { CardListResult, ListResult } from '@/types/list'
import request from '@/utils/request'

const Api = {
  BaseList: '/get-list',
  CardList: '/get-card-list'
}

export function getList({ page, pageSize }: { page: number; pageSize: number }) {
  return request
    .get<{ data: ListResult }>(Api.BaseList, {
      params: {
        page,
        pageSize
      }
    })
    .then((res) => res.data)
}

export function getCardList() {
  return request.get<{ data: CardListResult }>(Api.CardList).then((res) => res.data)
}
