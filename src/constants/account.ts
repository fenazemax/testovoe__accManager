import type { TAccount } from '@/types/account'
import { separateMarks } from '@/utils/separateInputMark'
import { ref } from 'vue'
import dayjs from 'dayjs'

export const ACCOUNT_STORE_NAME = 'account'
export const DB_NAME = 'passwordManager'

export const ACCOUNT_COLUMNS = [
  { title: 'Название', key: 'name' },
  { title: 'Логин', key: 'login' },
  { title: 'URL', key: 'URL' },
  {
    title: 'Метка',
    key: 'mark',
    render: (row: TAccount) => separateMarks(row.mark),
  },
  { title: 'Комментарий', key: 'comment' },
  { title: 'Создан', key: 'createdAt', render: (row: TAccount) => dayjs(row.createdAt).format('DD/MM/YYYY HH:mm:ss') },
  {
    title: 'Изменен',
    key: 'modifiedAt',
    render: (row: TAccount) => (row.modifiedAt ? dayjs(row.modifiedAt).format('DD/MM/YYYY HH:mm:ss') : ''),
  },
]

export const CHECKBOX_OPTIONS = {
  isMark: ref(false),
  isStar: ref(false),
  isURL: ref(false),
}
