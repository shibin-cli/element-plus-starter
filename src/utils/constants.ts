import { t } from '@/locals'

export const PANE_LIST_DATA = [
  {
    title: t('pages.dashboardDetail.topPanel.paneList.totalRequest'),
    number: '1126',
    upTrend: '10%'
  },
  {
    title: t('pages.dashboardDetail.topPanel.paneList.suppliers'),
    number: '13',
    downTrend: '13%'
  },
  {
    title: t('pages.dashboardDetail.topPanel.paneList.productCategory'),
    number: '4',
    upTrend: '10%'
  },
  {
    title: t('pages.dashboardDetail.topPanel.paneList.applicant'),
    number: 90,
    downTrend: '44%',
    leftType: 'icon-file-paste'
  },
  {
    title: t('pages.dashboardDetail.topPanel.paneList.completionRate'),
    number: 80.5,
    upTrend: '70%'
  },
  {
    title: t('pages.dashboardDetail.topPanel.paneList.arrivalRate'),
    number: 78,
    upTrend: '16%'
  }
]

export const PRODUCT_LIST = [
  {
    description: t('pages.dashboardDetail.sslDescription'),
    index: 1,
    isSetup: true,
    name: t('pages.dashboardDetail.ssl'),
    type: 4
  },
  {
    description: t('pages.dashboardDetail.sslDescription'),
    index: 1,
    isSetup: true,
    name: t('pages.dashboardDetail.ssl'),
    type: 4
  }
]
export interface UserInfoListType {
  title: string
  content: string
  span?: number
}

export const USER_INFO_LIST: Array<UserInfoListType> = [
  {
    title: 'pages.user.personalInfo.desc.mobile',
    content: '+86 13923734567'
  },
  {
    title: 'pages.user.personalInfo.desc.phone',
    content: '734567'
  },
  {
    title: 'pages.user.personalInfo.desc.email',
    content: 'Account@qq.com'
  },
  {
    title: 'pages.user.personalInfo.desc.seat',
    content: 'T32F 012'
  },
  {
    title: 'pages.user.personalInfo.desc.entity',
    content: '腾讯集团'
  },
  {
    title: 'pages.user.personalInfo.desc.leader',
    content: 'Michael Wang'
  },
  {
    title: 'pages.user.personalInfo.desc.position',
    content: '高级 UI 设计师'
  },
  {
    title: 'pages.user.personalInfo.desc.joinDay',
    content: '2021-07-01'
  },
  {
    title: 'pages.user.personalInfo.desc.group',
    content: '腾讯/腾讯公司/某事业群/某产品部/某运营中心/商户服务组',
    span: 6
  }
]

export const TEAM_MEMBERS = [
  {
    avatar: 'https://avatars.githubusercontent.com/Wen1kang',
    title: 'Lovellzhong 钟某某',
    description: '直客销售 港澳拓展组员工'
  },
  {
    avatar: 'https://avatars.githubusercontent.com/pengYYYYY',
    title: 'Jiajingwang 彭某某',
    description: '前端开发 前台研发组员工'
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/24469546?s=96&v=4',
    title: 'cruisezhang 林某某',
    description: '技术产品 产品组员工'
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/88708072?s=96&v=4',
    title: 'Lovellzhang 商某某',
    description: '产品运营 港澳拓展组员工'
  }
]

// export const PRODUCT_LIST = ['a', 'b', 'c', 'd']
export const CONTRACT_STATUS = {
  FAIL: 0,
  AUDIT_PENDING: 1,
  EXEC_PENDING: 2,
  EXECUTING: 3,
  FINISH: 4
}
export const CONTRACT_TYPES = {
  MAIN: 0,
  SUB: 1,
  SUPPLEMENT: 2
}
export const CONTRACT_PAYMENT_TYPES = {
  PAYMENT: 0,
  RECEIPT: 1
}
