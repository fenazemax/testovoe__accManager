<script lang="ts" setup>
import { NInput, NFlex } from 'naive-ui'
import BaseButton from '@/components/ui/BaseButton.vue'

const model = defineModel<string>()
const emit = defineEmits<{
  (e: 'input'): void
  (e: 'click', modelValue: string | undefined): void
}>()
</script>

<template>
  <n-flex :wrap="false" align="center">
    <n-input v-model:value="model" placeholder="Начните искать" @input="emit('input')" />
    <base-button :icon-variant="'Search'" @click="emit('click', model)" />
  </n-flex>
</template>
