<script lang="ts" setup>
import { NInput, NFormItem } from 'naive-ui'
import { useField } from 'vee-validate'
import { computed } from 'vue'

defineOptions({ inheritAttrs: false })
const model = defineModel<string>()
const props = defineProps<{
  required?: boolean
  label: string
  type?: 'text' | 'password' | 'textarea'
  name?: string
}>()

const isControlled = computed(() => !!props.name)

const field = isControlled.value ? useField<string>(() => props.name!) : null

const modelValue = computed({
  get: () => {
    if (field) {
      return field.value.value
    }
    return model.value || ''
  },
  set: (val: string) => {
    if (field) {
      field.setValue(val)
    }
    model.value = val
  },
})

const errorMessage = computed(() => {
  return field?.errorMessage.value
})

const handleBlur = () => {
  if (field) {
    field.handleBlur()
  }
}
</script>

<template>
  <n-form-item :label="props.label" :required="props.required" :validation-status="errorMessage ? 'error' : undefined">
    <n-input
      v-bind="$attrs"
      v-model:value="modelValue"
      :show-password-on="props.type === 'password' ? 'click' : undefined"
      :type="props.type ?? 'text'"
      @blur="handleBlur"
    >
      <template v-if="$slots.suffix" #suffix>
        <slot name="suffix" />
      </template>
    </n-input>
    <span class="error-span" v-show="errorMessage">{{ errorMessage }}</span>
  </n-form-item>
</template>

<style scoped>
.error-span {
  position: absolute;
  font-size: 12px;
  top: 2rem;
  left: 0;
  color: red;
}
</style>
