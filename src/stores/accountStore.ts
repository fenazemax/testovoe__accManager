import { ACCOUNT_STORE_NAME } from '@/constants/account.ts'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TAccount } from '@/types/account.ts'
import { deleteFromDB, loadAllFromDB, saveToDB, updateToDB } from '@/services/indexedDB'
import dayjs from 'dayjs'
import { useAccountFilter } from '@/utils/composables/useAccountFilter'

export const useAccountStore = defineStore(ACCOUNT_STORE_NAME, () => {
  const accounts = ref<TAccount[]>([])
  const query = ref<string>('')

  const filterredAccounts = useAccountFilter(accounts, query)

  const loadAccounts = async () => {
    accounts.value = await loadAllFromDB()
  }

  const searchAccount = (q: string) => {
    query.value = q
  }

  const addAccount = async (acc: TAccount) => {
    if (!accounts.value.some((account) => acc.id === account.id)) {
      accounts.value.push(acc)
      await saveToDB(acc)
    }
  }

  const deleteAccount = async (id: number) => {
    accounts.value = accounts.value.filter((account) => account.id !== id)
    await deleteFromDB(id)
  }

  const updateAccount = async (acc: TAccount) => {
    const index = accounts.value.findIndex((account) => account.id === acc.id)
    if (index !== -1) {
      const updatedAccount = {
        ...accounts.value[index],
        ...acc,
        modifiedAt: dayjs().toISOString(),
      }
      accounts.value[index] = updatedAccount
      await updateToDB(updatedAccount)
    }
  }

  const toggleFavorite = async (id: number, favorite: boolean) => {
    const index = accounts.value.findIndex((account) => account.id === id)
    if (index !== -1) {
      const updatedAccount = {
        ...accounts.value[index],
        favorite,
      }
      accounts.value[index] = updatedAccount
      await updateToDB(updatedAccount)
    }
  }

  return {
    accounts,
    filterredAccounts,
    query,
    loadAccounts,
    addAccount,
    deleteAccount,
    updateAccount,
    searchAccount,
    toggleFavorite,
  }
})
