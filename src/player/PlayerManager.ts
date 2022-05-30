// Type import.
import type { Client } from '../index'
import type { Realm } from '../realm'
import type { IRealm } from '../types'

// Regular imports.
import { Endpoints } from '../Constants'
import { Player } from '../player'

class PlayerManager {
  protected readonly client: Client
  protected readonly realm: Realm
  protected readonly cache = new Map<string, Player>()

  public constructor(client: Client, realm: Realm) {
    this.client = client
    this.realm = realm
  }

  public async getOnlinePlayers(): Promise<Player[] | undefined> {
    return new Promise((res) => {
      this.client.requests.createGetRequest<IRealm>(Endpoints.GET.Realm(this.realm.getId()), (result, error) => {
        if (error) return res(undefined)
        const iplayers = result.players.filter((x) => x.online === true)
        for (const iplayer of iplayers) {
          if (this.cache.has(iplayer.uuid)) continue
          const player = new Player(this.client, this.realm, iplayer)
          this.cache.set(iplayer.uuid, player)
        }

        return res(Array.from(this.cache.values()).filter((x) => x.isOnline() === true))
      })
    })
  }

  public async getOfflinePlayers(): Promise<Player[] | undefined> {
    return new Promise((res) => {
      this.client.requests.createGetRequest<IRealm>(Endpoints.GET.Realm(this.realm.getId()), (result, error) => {
        if (error) return res(undefined)
        const iplayers = result.players.filter((x) => x.online === false)
        for (const iplayer of iplayers) {
          if (this.cache.has(iplayer.uuid)) continue
          const player = new Player(this.client, this.realm, iplayer)
          this.cache.set(iplayer.uuid, player)
        }

        return res(Array.from(this.cache.values()).filter((x) => x.isOnline() === false))
      })
    })
  }
}

export {
  PlayerManager,
}
