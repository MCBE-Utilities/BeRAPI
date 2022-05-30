// Work in progress.

// Exports
export * from './Constants'
export * from './utils'

// Type imports.
import type { BeAuth } from '@mcbeutils/beauth'

// Regular imports.
import { RequestManager } from './requests'
import { RealmManager } from './realm'

class Client {
  protected readonly auth: BeAuth
  public readonly requests: RequestManager
  public readonly realms: RealmManager

  public constructor(auth: BeAuth) {
    this.auth = auth
    this.requests = new RequestManager(this)
    this.realms = new RealmManager(this)
  }

  public getAuth(): BeAuth {
    return this.auth
  }
}

export {
  Client,
}
