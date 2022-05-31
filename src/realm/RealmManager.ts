// Type imports.
import type { Client } from '../index'
import type { IRealm, ServersJSON } from '../types'

// Regular imports.
import { Endpoints } from '../Constants'
import { Realm } from './Realm'

class RealmManager {
  protected readonly client: Client

  public constructor(client: Client) {
    this.client = client
  }

  /**
   * Get all the realms that are listed on used account.
   * @returns All found realms.
   */
  public async getAll(): Promise<Realm[] | undefined> {
    return new Promise((res) => {
      this.client.requests.createGetRequest<ServersJSON>(Endpoints.REALMS.GET.Realms, (result, error) => {
        if (error) return res(undefined)
        const realms = result.servers.map((x) => new Realm(this.client, x))
  
        return res(realms)
      })
    })
  }

  /**
   * Get a realm by it's id.
   * @param {number} id Realm id. 
   * @returns Realm instance.
   */
  public async getById(id: number): Promise<Realm | undefined> {
    const realms = await this.getAll()
    const realm = realms.find((x) => x.getId() === id)
    if (!realm) return

    return realm
  }

  /**
   * Get all realms owned by a specific player.
   * @param {string} xuid Player's xuid.
   * @returns All found realms.
   */
  public async getByOwnerXuid(xuid: string): Promise<Realm[] | undefined> {
    const realms = await this.getAll()
    const found = realms.filter((x) => x.getIRealm().ownerUUID === xuid)
    if (!found) return

    return found
  }

  /**
   * Geta a realm by it's invite code.
   * @param {string} code Invite code.
   * @returns Realm instance.
   */
  public getByInviteCode(code: string): Promise<Realm | undefined> {
    return new Promise((res) => {
      this.client.requests.createGetRequest<IRealm>(Endpoints.REALMS.GET.RealmByInvite(code), (result, error) => {
        if (error) return res(undefined)
        const realm = new Realm(this.client, result)

        return res(realm)
      })
    })
  }
}

export {
  RealmManager,
}
