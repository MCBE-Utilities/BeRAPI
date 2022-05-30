export const MCBE_VERSION = '1.18.30'
export const MCBE_PROTOCOL = 503

export const RealmAPI = 'https://pocket.realms.minecraft.net/'
export const XboxAPI = 'https://profile.xboxlive.com/'

export const Endpoints = {
  REALMS: {
    GET: {
      UserCompatible: RealmAPI + "mco/client/compatible",
      UserTrial: RealmAPI + "trial/new",
      UserInvites: "invites/count/pending",
      LivePlayers: RealmAPI + "activities/live/players",
      Realms: RealmAPI + "worlds",
      Realm: (id: number): string => RealmAPI + `worlds/${id}`,
      RealmJoinInfo: (id: number): string => RealmAPI + `worlds/${id}/join`,
      RealmPacks: (id: number): string => RealmAPI + `worlds/${id}/content`,
      RealmSubsciptionDetails: (id: number): string => RealmAPI + `subscriptions/${id}/details`,
      RealmBackups: (id: number): string => RealmAPI + `worlds/${id}/backups`,
      RealmBackup: (id: number, slot: number, backupId: string): string => RealmAPI + `archive/download/world/${id}/${slot}/${backupId}`,
      RealmBackupLatest: (id: number, slot: number): string => RealmAPI + `archive/download/world/${id}/${slot}/latest`,
      RealmInviteLink: (id: number): string => RealmAPI + `links/v1?worldId=${id}`,
      RealmByInvite: (invite: string): string => RealmAPI + `worlds/v1/link/${invite}`,
      RealmBlockedPlayers: (id: number): string => RealmAPI + `worlds/${id}/blocklist`,
    },
    POST: {
      RealmBlockPlayer: (id: number, xuid: string | number): string => RealmAPI + `worlds/${id}/blocklist/${xuid}`,
      RealmAcceptInvite: (invite: string): string => RealmAPI + `worlds/v1/link/accept/${invite}`,
      RealmConfiguration: (id: number): string => RealmAPI + `worlds/${id}/configuration`,
    },
    PUT: {
      RealmUpdateInvite: (id: number): string => RealmAPI + `invites/${id}/invite/update`,
      RealmDefaultPermission: (id: number): string => RealmAPI + `worlds/${id}/defaultPermission`,
      RealmUserPermission: (id: number): string => RealmAPI + `worlds/${id}/userPermission`,
      RealmBackup: (id: number, backupId: string): string => RealmAPI + `worlds/${id}/backups?backupId=${backupId}&clientSupportsRetries`,
      RealmSlot: (id: number, slotNum: number): string => RealmAPI + `worlds/${id}/slot/${slotNum}`,
      RealmOpen: (id: number): string => RealmAPI + `worlds/${id}/open`,
      RealmClose: (id: number): string => RealmAPI + `worlds/${id}/close`,
    },
    DELETE: {
      RealmBlockedPlayer: (id: number, xuid: string | number): string => RealmAPI + `worlds/${id}/blocklist/${xuid}`,
      RealmInvite: (id: number): string => RealmAPI + `invites/${id}`,
      RealmWorld: (id: number): string => RealmAPI + `worlds/${id}`,
    },
  },
  XBOX: {
    GET: {
      UserSettings: (xuid: string): string => XboxAPI + `users/xuid(${xuid})/settings`,
      XuidResolve: (name: string): string => XboxAPI + `users/gt(${name})/settings`
    }
  }
}
