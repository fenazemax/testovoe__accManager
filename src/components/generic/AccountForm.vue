<script lang="ts" setup>
import type { TAccount } from '@/types/account'
import { NCard, NFlex, NForm, useMessage } from 'naive-ui'
import BaseInput from '../ui/BaseInput.vue'
import { ref, watch } from 'vue'
import MarkInput from '../ui/MarkInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useForm } from 'vee-validate'
import { accountSchema } from '@/utils/validation/accountSchema'

const props = defineProps<{
  account: TAccount
  title: string
}>()

const emit = defineEmits<{
  (e: 'save', account: TAccount): void
  (e: 'cancel'): void
}>()

const message = useMessage()

const account = ref<TAccount>({ ...props.account })

const { handleSubmit, setValues, values } = useForm({
  validationSchema: accountSchema,
  initialValues: {
    name: account.value.name || '',
    login: account.value.login || '',
    password: account.value.password || '',
    URL: account.value.URL || '',
    comment: account.value.comment || '',
  },
})

const handleSave = handleSubmit((validatedValues) => {
  const newAccount: TAccount = {
    ...account.value,
    ...validatedValues,
  }
  emit('save', newAccount)
})

const handleCopy = async () => {
  if (!values.password) return
  await navigator.clipboard.writeText(values.password)
  message.success('Пароль скопирован')
}

watch(
  () => props.account,
  (newAccount) => {
    setValues({
      name: newAccount.name || '',
      login: newAccount.login || '',
      password: newAccount.password || '',
    })
    account.value = {
      ...newAccount,
    }
  },
  { immediate: true },
)
</script>

<template>
  <n-card :title="props.title" aria-modal="true" class="card-size">
    <base-button icon-variant="Close" @click="emit('cancel')" class="btn-position" quaternary></base-button>
    <n-form @submit.prevent="handleSave">
      <n-flex vertical>
        <base-input name="name" :required="true" label="Название" />
        <base-input name="login" :required="true" label="Логин" />
        <base-input name="password" :required="true" label="Пароль" type="password">
          <template #suffix>
            <base-button quaternary icon-variant="Copy" @click="handleCopy" />
          </template>
        </base-input>
        <base-input name="URL" label="URL" v-model="account.URL" />
        <mark-input v-model="account.mark" />
        <base-input name="comment" label="Комментарий" type="textarea" v-model="account.comment" />
        <n-flex>
          <base-button type="primary" attr-type="submit">Сохранить</base-button>
          <base-button @click="emit('cancel')">Отмена</base-button>
        </n-flex>
      </n-flex>
    </n-form>
  </n-card>
</template>

<style scoped>
.card-size {
  position: relative;
  width: 60%;
}

.btn-position {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
}
</style>
