import type { TAccount } from '@/types/account'
import dayjs from 'dayjs'
import { computed, type Ref } from 'vue'

export const useAccountFilter = (accounts: Ref<TAccount[]>, query: Ref<string>) => {
  return computed(() => {
    if (!query.value) {
      return accounts.value
    }

    const searchItem = query.value.toLowerCase()

    return accounts.value.filter((account) => {
      const searchFields = [
        account.name.toLowerCase() || '',
        account.URL?.toLowerCase() || '',
        account.login.toLowerCase() || '',
        dayjs(account.createdAt).format('DD/MM/YYYY HH:mm:ss').toLowerCase() || '',
      ]

      return searchFields.some((field) => field.includes(searchItem))
    })
  })
}
