<script setup lang="ts">
import SearchField from '@/components/generic/SearchField.vue'
import { ref } from 'vue'
import { useAccountStore } from '@/stores/accountStore.ts'
import { debouncedSearch } from '@/utils/debounceSearch'

const accountStore = useAccountStore()

const searchQuery = ref<string>('')

const handleSearch = (value: string) => {
  accountStore.searchAccount(value)
}

const handleSearchDebounced = debouncedSearch(handleSearch, 400)
</script>

<template>
  <search-field
    v-model="searchQuery"
    @input="handleSearchDebounced(searchQuery)"
    @click="handleSearch(searchQuery)"
  ></search-field>
</template>
