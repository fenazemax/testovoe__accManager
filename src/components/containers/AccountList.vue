<script lang="ts" setup>
import { useAccountStore } from '@/stores/accountStore'
import { NModal, useMessage } from 'naive-ui'
import AccountForm from '../generic/AccountForm.vue'
import { computed, ref } from 'vue'
import type { TAccount } from '@/types/account'
import { useAccountColumns } from '@/utils/composables/useAccountColumns'
import { useFilterGroups } from '@/utils/composables/useFilterGroups'
import { CHECKBOX_OPTIONS } from '@/constants/account'
import FilterGroup from '@/components/generic/FilterGroup.vue'
import GenericTable from '../generic/GenericTable.vue'
import type { TFilterOption } from '@/types/options'

const accountStore = useAccountStore()
const message = useMessage()

const selectedAccount = ref<TAccount | null>(null)
const isOpen = ref(false)
const page = ref(1)
const pageSize = ref(10)

const filterOptions: TFilterOption[] = [
  { label: 'Меткам', key: 'mark', model: CHECKBOX_OPTIONS.isMark },
  { label: 'Избранным', key: 'star', model: CHECKBOX_OPTIONS.isStar },
  { label: 'URL', key: 'url', model: CHECKBOX_OPTIONS.isURL },
]

const groupedAccounts = computed(() => useFilterGroups(accountStore.filterredAccounts, CHECKBOX_OPTIONS))

const handleOpen = (account: TAccount) => {
  selectedAccount.value = account
  isOpen.value = true
}

const handleClose = () => {
  isOpen.value = false
}

const handleSave = (updatedAccount: TAccount) => {
  accountStore.updateAccount(updatedAccount)
  message.success('Аккаунт изменен')
  isOpen.value = false
}

const handleDelete = (accId: number) => {
  accountStore.deleteAccount(accId)
}

const handleFavorite = (acc: TAccount, val: boolean) => {
  accountStore.toggleFavorite(acc.id, val)
}

const columns = useAccountColumns(handleOpen, handleDelete, handleFavorite)
</script>

<template>
  <generic-table :columns="columns" :data="groupedAccounts.value" v-model:page="page" v-model:page-size="pageSize">
    <filter-group :options="filterOptions" />
  </generic-table>

  <n-modal v-model:show="isOpen">
    <account-form
      v-if="selectedAccount"
      :account="selectedAccount"
      title="Редактирование Аккаунта"
      @cancel="handleClose"
      @save="handleSave"
    />
  </n-modal>
</template>
