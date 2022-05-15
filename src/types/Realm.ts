export type RealmState = 'OPEN' | 'CLOSED'

export interface RealmJoinInfo {
  address: string
  pendingUpdated: boolean
}

export interface RealmAddress {
  address: string
  port: number
}