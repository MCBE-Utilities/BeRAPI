// Type imports.
import type { Client } from '../index'

// Regular imports.
import axios from 'axios'
import { createHeader } from '../utils'

class RequestManager {
  protected readonly client: Client

  public constructor(client: Client) {
    this.client = client
  }

  public createGetRequest<K>(endpoint: string, callback: (result: K, error: boolean) => void): void {
    axios.get(endpoint, {
      headers: createHeader(this.client.getXsts(), this.client.getHash())
    }).then((result) => {
      return callback(result.data, false)
    }).catch(() => {
      return callback(undefined, true)
    })
  }
}

export {
  RequestManager,
}
