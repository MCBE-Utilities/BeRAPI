// Type imports.
import type { Client } from '../index'
import type { IRealm, RealmState, RealmJoinInfo, RealmAddress } from '../types'

// Regular imports.
import { Endpoints } from '../Constants'
import { Banned, Player, PlayerManager } from '../player'

class Realm {
  protected readonly client: Client
  protected readonly IRealm: IRealm

  public readonly players: PlayerManager

  public constructor (client: Client, IRealm: IRealm) {
    this.client = client
    this.IRealm = IRealm
    this.players = new PlayerManager(this.client, this)
  }

  /**
   * Gets the raw json of the realm response.
   * @returns Raw json.
   */
  public getIRealm(): IRealm {
    return this.IRealm
  }

  /**
   * Get the realm's id.
   * @returns Realm id.
   */
  public getId(): number {
    return this.IRealm.id
  }

  /**
   * Get the realms microsoft club id.
   * @returns Club id.
   */
  public getClubId(): string {
    return this.IRealm.clubId
  }

  /**
   * Gets the state of the realm.
   * @returns OPEN or CLOSED
   */
  public getState(): RealmState {
    return this.IRealm.state
  }

  /**
   * Checks if the realm is expired.
   * @returns Boolean.
   */
  public isExpired(): boolean {
    return this.IRealm.expired
  }

  /**
   * Closes the realm.
   * @returns True or False.
   */
  public async close(): Promise<boolean> {
    return new Promise((res) => {
      this.client.requests.createPutRequest(Endpoints.REALMS.PUT.RealmClose(this.getId()), (_result, error) => {
        if (error) return res(false)
        
        return res(true)
      })
    })
  }

  /**
   * Opens the realm.
   * @returns True or False.
   */
    public async open(): Promise<boolean> {
      return new Promise((res) => {
        this.client.requests.createPutRequest(Endpoints.REALMS.PUT.RealmOpen(this.getId()), (_result, error) => {
          if (error) return res(false)
          
          return res(true)
        })
      })
    }

  public getName(): string {
    return this.IRealm.name
  }

  /**
   * Set the name of the realm.
   * @param {string} name New name for the realm.
   * @returns True or False.
   */
  public async setName(name: string): Promise<boolean> {
    return new Promise((res) => {
      this.client.requests.createPostRequest(Endpoints.REALMS.POST.RealmConfiguration(this.getId()), {
        description: {
          name: name,
        },
        options: {
          texturePacksRequired: true,
        },
      }, (_result, error) => {
        if (error) return res(false)
          
        return res(true)
      })
    })
  }

  /**
   * Get the realms port and ip address.
   * @returns Port and IP Address
   */
  public async getAddress(): Promise<RealmAddress> {
    return new Promise((res) => {
      this.client.requests.createGetRequest<RealmJoinInfo>(Endpoints.REALMS.GET.RealmJoinInfo(this.getId()), (result, error) => {
        if (error) return res(undefined)
        const address = result.address.split(':')[0]
        const port = parseInt(result.address.split(':')[1])
        
        return res({
          address,
          port,
        })
      })
    })
  }

  /**
   * Get the description of the realm.
   * @returns Realm description.
   */
  public getDescription(): string {
    return this.IRealm.motd
  }

  /**
   * Set the description of the realm.
   * @param {string} description Realm description.
   * @returns True or False.
   */
  public async setDescription(description: string): Promise<boolean> {
    return new Promise((res) => {
      this.client.requests.createPostRequest(Endpoints.REALMS.POST.RealmConfiguration(this.getId()), {
        description: {
          description: description,
        },
        options: {
          texturePacksRequired: true,
        },
      }, (_result, error) => {
        if (error) return res(false)
          
        return res(true)
      })
    })
  }

  /**
   * Gets all banned players on the realm.
   * @returns Banned players.
   */
  public async getBanList(): Promise<Banned[] | undefined> {
    return new Promise((res) => {
      this.client.requests.createGetRequest<string[]>(
        Endpoints.REALMS.GET.RealmBlockedPlayers(this.getId()),
        async (result, error) => {
          if (error) return res(undefined)
          const banlist = result.map((x) => new Banned(this.client, this, x))

          return res(banlist)
        }
      )
    })
  }

  /**
   * Adds a player to the banlist.
   * @param {Player | Banned | string} player 
   * @returns boolean
   */
  public async banPlayer(player: Player | Banned | string): Promise<boolean> {
    return new Promise((res) => {
      if (player instanceof Player || player instanceof Banned) {
        this.client.requests.createPostRequest(
          Endpoints.REALMS.POST.RealmBlockPlayer(this.getId(), player.getXuid()),
          {},
          (_result, error) => {
            if (error) return res(false)
  
            return res(true)
          }
        )
      } else {
        this.client.requests.createPostRequest(
          Endpoints.REALMS.POST.RealmBlockPlayer(this.getId(), player),
          {},
          (_result, error) => {
            if (error) return res(false)
  
            return res(true)
          }
        )
      }
    })
  }

  /**
   * Remove a player from the ban list.
   * @param {Player | Banned | string} player 
   * @returns boolean
   */
  public unbanPlayer(player: Player | Banned | string): Promise<boolean> {
    return new Promise((res) => {
      if (player instanceof Player || player instanceof Banned) {
        this.client.requests.createDeleteRequest(
          Endpoints.REALMS.DELETE.RealmBlockedPlayer(this.getId(), player.getXuid()),
          (_result, error) => {
            if (error) return res(false)
  
            return res(true)
          }
        )
      } else {
        this.client.requests.createDeleteRequest(
          Endpoints.REALMS.DELETE.RealmBlockedPlayer(this.getId(), player),
          (_result, error) => {
            if (error) return res(false)
  
            return res(true)
          }
        )
      }
    })
  }
}

export {
  Realm,
}
