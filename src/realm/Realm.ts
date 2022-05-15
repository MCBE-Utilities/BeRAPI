// Type imports.
import type { Client } from '../index'
import type { IRealm } from '../types'

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
}

export {
  Realm,
}
