import type { TAccount } from '@/types/account'
import type { TOptions } from '@/types/options'
import { computed } from 'vue'

export const useFilterGroups = (accounts: TAccount[], options: TOptions) => {
  return computed(() => {
    return accounts.filter((account) => {
      if (options.isStar.value && !account.favorite) return false
      if (options.isMark.value && account.mark.length === 0) return false
      if (options.isURL.value && !account.URL) return false
      return true
    })
  })
}
