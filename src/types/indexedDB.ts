import type { TAccount } from './account'

export type TAccountDB = Omit<TAccount, 'mark'> & {
  mark: string
}
