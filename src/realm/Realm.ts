// Type imports.
import type { Client } from '../index'
import type { IRealm, RealmState, RealmJoinInfo, RealmAddress } from '../types'

// Regular imports.
import { Endpoints } from '../Constants'

class Realm {
  protected readonly client: Client
  protected readonly IRealm: IRealm

  public constructor (client: Client, IRealm: IRealm) {
    this.client = client
    this.IRealm = IRealm
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
   * Get the owner of the realm.
   * @returns Player xuid.
   */
  public getOwnerXuid(): string {
    return this.IRealm.ownerUUID
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
      this.client.requests.createPutRequest(Endpoints.PUT.RealmClose(this.getId()), (_result, error) => {
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
        this.client.requests.createPutRequest(Endpoints.PUT.RealmOpen(this.getId()), (_result, error) => {
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
      this.client.requests.createPostRequest(Endpoints.POST.RealmConfiguration(this.getId()), {
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
      this.client.requests.createGetRequest<RealmJoinInfo>(Endpoints.GET.RealmJoinInfo(this.getId()), (result, error) => {
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

  public getDescription(): string {
    return this.IRealm.motd
  }

  public async setDescription(description: string): Promise<boolean> {
    return new Promise((res) => {
      this.client.requests.createPostRequest(Endpoints.POST.RealmConfiguration(this.getId()), {
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
}

export {
  Realm,
}
