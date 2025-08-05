import type { TMark } from '@/types/account'

export const separateMarks = (value: TMark) => {
  const separation = '; '
  return value.map((val) => val.text).join(separation) + (value.length ? separation : '')
}
