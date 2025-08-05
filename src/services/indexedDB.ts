import { openDB } from 'idb'
import { ACCOUNT_STORE_NAME, DB_NAME } from '@/constants/account.ts'
import type { TAccount, TMark } from '@/types/account.ts'
import type { TAccountDB } from '@/types/indexedDB'

const db = await openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(ACCOUNT_STORE_NAME)) {
      db.createObjectStore(ACCOUNT_STORE_NAME, { keyPath: 'id', autoIncrement: true })
    }
  },
})

const prepareForDB = (account: TAccount): TAccountDB => {
  return {
    ...account,
    mark: JSON.stringify(account.mark),
    createdAt: account.createdAt,
    modifiedAt: account.modifiedAt,
  }
}

const restoreFromDB = (dbAccount: TAccountDB): TAccount => {
  return {
    ...dbAccount,
    mark: JSON.parse(dbAccount.mark) as TMark,
    createdAt: dbAccount.createdAt,
    modifiedAt: dbAccount.modifiedAt,
  }
}

export const saveToDB = async (account: TAccount) => {
  const accountForDB = prepareForDB(account)
  return db.add(ACCOUNT_STORE_NAME, accountForDB)
}

export const loadAllFromDB = async (): Promise<TAccount[]> => {
  const dbAccounts = (await db.getAll(ACCOUNT_STORE_NAME)) as TAccountDB[]
  return dbAccounts.map(restoreFromDB)
}

export const deleteFromDB = async (id: number) => {
  return db.delete(ACCOUNT_STORE_NAME, id)
}

export const updateToDB = async (account: TAccount) => {
  const accountForDB = prepareForDB(account)
  return db.put(ACCOUNT_STORE_NAME, accountForDB)
}
