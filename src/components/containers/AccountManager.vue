<script lang="ts" setup>
import AccountForm from '@/components/generic/AccountForm.vue'
import { ref } from 'vue'
import type { TAccount } from '@/types/account.ts'
import BaseButton from '@/components/ui/BaseButton.vue'
import { createNewAccount } from '@/utils/createAccount.ts'
import { NModal, useMessage } from 'naive-ui'
import { useAccountStore } from '@/stores/accountStore.ts'

const accountStore = useAccountStore()
const message = useMessage()

const isOpen = ref(false)
const newAccount = ref<TAccount | null>(null)

const handleOpen = () => {
  newAccount.value = createNewAccount()
  isOpen.value = true
}

const handleCreate = (validatedAccount: TAccount): void => {
  accountStore.addAccount(validatedAccount)
  message.success('Аккаунт добавлен')
  isOpen.value = false
}

const handleCancel = () => {
  isOpen.value = false
}
</script>

<template>
  <base-button icon-variant="Add" @click="handleOpen">Добавить</base-button>
  <n-modal v-model:show="isOpen" size="small">
    <account-form
      v-if="newAccount"
      :account="newAccount"
      @cancel="handleCancel"
      @save="handleCreate"
      title="Создание учетной записи"
    />
  </n-modal>
</template>
