// Type import.
import type { Client } from '../index'
import type { Realm } from '../realm'
import type { IRealm, ProfileUsers} from '../types'

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

  /**
   * Gets all members of the realm.
   * @returns Array of players.
   */
  public async getAll(): Promise<Player[] | undefined> {
    return new Promise((res) => {
      this.client.requests.createGetRequest<IRealm>(Endpoints.REALMS.GET.Realm(this.realm.getId()), (result, error) => {
        if (error) return res(undefined)
        const iplayers = result.players
        for (const iplayer of iplayers) {
          if (this.cache.has(iplayer.uuid)) continue
          const player = new Player(this.client, this.realm, iplayer)
          this.cache.set(iplayer.uuid, player)
        }

        return res(Array.from(this.cache.values()))
      })
    })
  }

  /**
   * Gets all players that are currently on the realm.
   * @returns Array of players.
   */
  public async getAllOnline(): Promise<Player[] | undefined> {
    const players = await this.getAll()

    return players.filter((x) => x.isOnline() === true)
  }

  /**
   * Gets all players that are not currently on the realm.
   * @returns Array of players.
   */
  public async getAllOffline(): Promise<Player[] | undefined> {
    const players = await this.getAll()

    return players.filter((x) => x.isOnline() === false)
  }

  /**
   * Gets a player by their xuid.
   * @param {string} xuid Xuid. 
   * @returns Player.
   */
  public async getByXuid(xuid: string): Promise<Player | undefined> {
    const players = await this.getAll()
    const player = players.find((x) => x.getXuid() === xuid)

    return player
  }

  /**
   * Gets a player by their name.
   * @param {string} name Player's name.
   * @returns Player. 
   */
  public async getByName(name: string): Promise<Player | undefined> {
    return new Promise((res) => {
      this.client.requests.createGetRequest<ProfileUsers>(
        Endpoints.XBOX.GET.UserSettingsByName(name),
        async (result, error) => {
          if (error) return res(undefined)
          const player = await this.getByXuid(result.profileUsers[0].id)
          if (!player) return res(undefined)

          return res(player)
        },
        this.client.getAuth().getDefaultChain().xsts_token,
        this.client.getAuth().getDefaultChain().user_hash,
      )
    })
  }

  /**
   * Gets the owner of the realm.
   * @returns Owners name and xuid.
   */
  public async getOwner(): Promise<{name: string, xuid: string}> {
    return new Promise(async (res) => {
      await this.client.requests.createGetRequest<ProfileUsers>(
        Endpoints.XBOX.GET.UserSettingsByXuid(this.realm.getIRealm().ownerUUID),
        (result, error) => {
          if (error) return new Error(`${result}`)
          const xuid = result.profileUsers[0].id
          const name = result.profileUsers[0].settings[0].value

          return res({
            xuid,
            name,
          })
        },
        this.client.getAuth().getDefaultChain().xsts_token,
        this.client.getAuth().getDefaultChain().user_hash,
        {
          settings: 'Gamertag,Gamerscore,GameDisplayPicRaw,AccountTier,XboxOneRep,PreferredColor,RealName,Bio,IsQuarantined'
        }
      )
    })
  }
}

export {
  PlayerManager,
}
