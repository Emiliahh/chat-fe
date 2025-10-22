// return time in "HH:MM" format with dayjs
import dayjs from 'dayjs'
export function formatTimeToHHMM(time: string | Date | number) {
  return dayjs(time).format('HH:mm')
}
