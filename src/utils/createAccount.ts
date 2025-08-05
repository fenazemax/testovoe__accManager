import type { TAccount, TMark } from '@/types/account.ts'
import dayjs from 'dayjs'

export const createNewAccount = (): TAccount => {
  return {
    id: Date.now(),
    name: '',
    login: '',
    password: '',
    URL: undefined,
    comment: undefined,
    mark: [] as TMark,
    createdAt: dayjs().toISOString(),
    modifiedAt: undefined,
    favorite: false,
  }
}
