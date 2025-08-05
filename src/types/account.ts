export type TMark = Array<{ text: string }>

export type TAccount = {
  id: number
  name: string
  URL?: string
  login: string
  password: string
  mark: TMark
  comment?: string
  createdAt: string
  modifiedAt?: string
  favorite?: boolean
}
