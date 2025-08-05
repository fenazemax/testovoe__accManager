import type { TMark } from '@/types/account'

export const formatInputMark = (value: string): TMark => {
  return value
    .split(/[\s;]+/)
    .map((string) => string.trim())
    .filter(Boolean)
    .map((text) => ({ text }))
}
