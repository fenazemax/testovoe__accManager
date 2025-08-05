import type { Ref } from 'vue'

export type TOptions = {
  isStar: Ref<boolean>
  isURL: Ref<boolean>
  isMark: Ref<boolean>
}

export type TFilterOption = {
  label: string
  key: string
  model: Ref<boolean>
}
