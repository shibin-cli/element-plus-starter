import dayjs from 'dayjs'

export function getRandomArray(num = 100): number {
  let resultNum = Number((Math.random() * num).toFixed(0))

  if (resultNum <= 1) {
    resultNum = 1
  }

  return resultNum
}
export const LAST_7_DAYS = [
  dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
  dayjs().subtract(1, 'day').format('YYYY-MM-DD')
]
export function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout

  return function executedFunction() {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      func()
    }, wait)
  }
}

/**
 * 获取表头数据
 *
 * @export
 * @param {string[]} dateTime
 * @param {number} divideNum
 * @returns {string[]}
 */
export function getDateArray(dateTime: string[] = [], divideNum = 10): string[] {
  const timeArray: string[] = []
  if (dateTime.length > 0) {
    for (let i = 0; i < divideNum; i++) {
      const dateAbsTime: number =
        (new Date(dateTime[1]).getTime() - new Date(dateTime[0]).getTime()) / divideNum
      const enhandTime: number = new Date(dateTime[0]).getTime() + dateAbsTime * i
      timeArray.push(dayjs(enhandTime).format('YYYY-MM-DD'))
    }
  }

  return timeArray
}
