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
  public getRealmId(): number {
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
    return new Promise((res, rej) => {
      this.client.requests.createPutRequest(Endpoints.PUT.RealmClose(this.getRealmId()), (_result, error) => {
        if (error) return rej(error)
        
        return res(true)
      })
    })
  }

  /**
   * Opens the realm.
   * @returns True or False.
   */
    public async open(): Promise<boolean> {
      return new Promise((res, rej) => {
        this.client.requests.createPutRequest(Endpoints.PUT.RealmOpen(this.getRealmId()), (_result, error) => {
          if (error) return rej(error)
          
          return res(true)
        })
      })
    }

  /**
   * Rename the realm.
   * @param {string} name New name for the realm.
   * @returns True or False.
   */
  public async rename(name: string): Promise<boolean> {
    return new Promise((res, rej) => {
      this.client.requests.createPostRequest(Endpoints.POST.RealmConfiguration(this.getRealmId()), {
        description: {
          name: name,
        },
        options: {
          texturePacksRequired: true,
        },
      }, (_result, error) => {
        if (error) return rej(error)
          
        return res(true)
      })
    })
  }

  /**
   * Get the realms port and ip address.
   * @returns Port and IP Address
   */
  public async getAddress(): Promise<RealmAddress> {
    return new Promise((res, rej) => {
      this.client.requests.createGetRequest<RealmJoinInfo>(Endpoints.GET.RealmJoinInfo(this.getRealmId()), (result, error) => {
        if (error) return rej(error)
        const address = result.address.split(':')[0]
        const port = parseInt(result.address.split(':')[1])
        
        return res({
          address,
          port,
        })
      })
    })
  }
}

export {
  Realm,
}
