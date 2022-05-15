// Type imports.
import type { RealmState } from './Realm'

export interface ServersJSON {
  servers: IRealm[]
}

export interface IRealm {
  id: number
  remoteSubscriptionId: string
  owner: string
  ownerUUID: string
  name: string
  motd: string
  defaultPermission: string
  state: RealmState
  daysLeft: number
  expired: boolean
  expiredTrial: boolean
  gracePeriod: boolean
  worldType: string
  players: IPlayer[]
  maxPlayers: number
  minigameName: null
  minigameId: null
  minigameImage: null
  activeSlot: number
  slots: null
  member: false
  clubId: string
  subscriptionRefreshStatus: null
}

export interface IPlayer {
  uuid: string // Xuid
  name: null
  operator: boolean
  accepted: boolean
  online: boolean
  permission: string
}
