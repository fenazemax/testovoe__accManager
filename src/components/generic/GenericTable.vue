<script setup lang="ts">
import type { useAccountColumns } from '@/utils/composables/useAccountColumns'
import { NDataTable, NFlex, NPagination } from 'naive-ui'
import type { RowData } from 'naive-ui/es/data-table/src/interface'
import { computed } from 'vue'

const modelPage = defineModel<number>('page', { default: 1 })
const modelPageSize = defineModel<number>('pageSize', { default: 10 })

const props = defineProps<{
  data: RowData[]
  columns: ReturnType<typeof useAccountColumns>
}>()

const paginatedArray = computed(() => {
  const start = (modelPage.value - 1) * modelPageSize.value
  return props.data.slice(start, start + modelPageSize.value)
})
</script>

<template>
  <n-flex :wrap="false">
    <n-data-table :columns="props.columns" :data="paginatedArray" size="large" />
    <slot />
  </n-flex>
  <n-pagination
    v-model:page="modelPage"
    v-model:page-size="modelPageSize"
    :item-count="props.data.length"
    :page-sizes="[5, 10, 20]"
    show-size-picker
  />
</template>
