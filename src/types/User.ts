export interface ProfileUsers {
  profileUsers: UserSettings[]
}

export interface UserSettings {
  id: string
  hostId: string
  settings: Setting[]
  isSponsoredUser: boolean
}

export interface Setting {
  id: string
  value: any
}