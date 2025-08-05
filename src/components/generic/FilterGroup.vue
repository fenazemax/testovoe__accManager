<script lang="ts" setup>
import type { TFilterOption } from '@/types/options'
import { NCard, NCheckbox, NFlex } from 'naive-ui'

const props = defineProps<{
  options: TFilterOption[]
}>()
</script>

<template>
  <n-card title="Группировать по:" size="small" class="size-change">
    <n-flex vertical>
      <n-checkbox
        v-for="option in props.options"
        :key="option.key"
        :label="option.label"
        v-model:checked="option.model.value"
      ></n-checkbox>
    </n-flex>
  </n-card>
</template>

<style scoped>
.size-change {
  width: 11rem;
  max-height: 10.6rem;
}
</style>
