<script lang="ts" setup>
import { NButton, NIcon } from 'naive-ui'
import { defineAsyncComponent, useAttrs } from 'vue'

const props = defineProps<{
  type?: 'primary' | 'warning' | 'info' | 'default'
  iconVariant?: 'Delete' | 'Edit' | 'Add' | 'Search' | 'Close' | 'Copy'
  attrType?: 'button' | 'submit' | 'reset'
  quaternary?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const attrs = useAttrs()

const iconComponent = defineAsyncComponent(() => import(`@/components/ui/Icons/${props.iconVariant}Icon.vue`))
</script>

<template>
  <n-button
    v-bind="attrs"
    :type="props.type"
    @click="emit('click')"
    :attr-type="props.attrType ?? 'button'"
    :quaternary="props.quaternary ?? false"
  >
    <n-icon v-if="iconVariant" :size="16">
      <component :is="iconComponent" v-if="iconComponent"></component>
    </n-icon>
    <slot />
  </n-button>
</template>
