// Work in progress.

export * from './Constants'

// Regular imports.
import { RequestManager } from './requests'
import { RealmManager } from './realm'

class Client {
  protected readonly xuid: string
  protected readonly xsts: string
  protected readonly hash: string
  public readonly requests: RequestManager
  public readonly realms: RealmManager

  public constructor(xuid: string, xsts: string, hash: string) {
    this.xuid = xuid
    this.xsts = xsts
    this.hash = hash
    this.requests = new RequestManager(this)
    this.realms = new RealmManager(this)
  }

  public getXuid(): string {
    return this.xuid
  }

  public getXsts(): string {
    return this.xsts
  }

  public getHash(): string {
    return this.hash
  }

}

export {
  Client,
}
