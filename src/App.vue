<script lang="ts" setup>
import AccountFilterSearch from '@/components/containers/AccountSearch.vue'
import { NConfigProvider, NMessageProvider, NModalProvider } from 'naive-ui'
import AccountList from './components/containers/AccountList.vue'
import AccountManager from '@/components/containers/AccountManager.vue'
import { onMounted } from 'vue'
import { useAccountStore } from './stores/accountStore'

const accountStore = useAccountStore()

onMounted(async () => {
  await accountStore.loadAccounts()
})
</script>

<template>
  <n-config-provider>
    <div class="app">
      <n-modal-provider>
        <n-message-provider>
          <account-manager />
          <account-filter-search />
          <account-list />
        </n-message-provider>
      </n-modal-provider>
    </div>
  </n-config-provider>
</template>

<style scoped>
.app {
  padding-top: 50px;
  margin: 0 auto;
  width: 90%;
}
</style>
