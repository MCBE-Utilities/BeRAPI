// Exports
export * from './Constants'
export * from './utils'

// Type imports.
import type { Authorize } from './types'

// Regular imports.
import { BeAuth } from '@mcbeutils/beauth'
import { RequestManager } from './requests'
import { RealmManager } from './realm'

class Client {
  protected readonly auth: BeAuth
  public readonly requests: RequestManager
  public readonly realms: RealmManager

  public constructor(auth: BeAuth | Authorize) {
    if (auth instanceof BeAuth) this.auth = auth
    else this.auth = new BeAuth(auth.mcbeChain, auth.defaultChain)
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
