<script lang="ts" setup>
import { ref, watch } from 'vue'
import { NFormItem, NInput } from 'naive-ui'
import { formatInputMark } from '@/utils/formatInputMark'
import type { TMark } from '@/types/account'
import { separateMarks } from '@/utils/separateInputMark'

const props = defineProps<{
  modelValue: TMark
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: TMark): void
  (e: 'blur'): void
}>()

const inputText = ref('')

const parseAndEmit = (val: string) => {
  const parsed = formatInputMark(val)

  emit('update:modelValue', parsed)
}

const onInput = (val: string) => {
  inputText.value = val
}

const onBlur = () => {
  parseAndEmit(inputText.value)
  inputText.value = separateMarks(props.modelValue)
  emit('blur')
}

watch(
  () => props.modelValue,
  (value) => {
    inputText.value = separateMarks(value)
  },
  { immediate: true },
)
</script>

<template>
  <n-form-item label="Метки">
    <n-input :value="inputText" placeholder="Укажите метки через ;" @blur="onBlur" @input="onInput" />
  </n-form-item>
</template>
