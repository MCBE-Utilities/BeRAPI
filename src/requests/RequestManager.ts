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

  public createGetRequest<K>(endpoint: string, callback: (result: K, error: boolean) => void, xsts?: string, hash?: string, params?: any): void {
    axios.get(endpoint, {
      params: params ?? {},
      headers: createHeader(xsts ?? this.client.getAuth().getXsts(), hash ?? this.client.getAuth().getHash())
    }).then((result) => {
      return callback(result.data, false)
    }).catch((reason) => {
      return callback(reason, true)
    })
  }

  public createPutRequest<K>(endpoint: string, callback: (result: K, error: boolean) => void, xsts?: string, hash?: string): void {
    axios.put(endpoint, {}, {
      headers: createHeader(xsts ?? this.client.getAuth().getXsts(), hash ?? this.client.getAuth().getHash())
    }).then((result) => {
      return callback(result.data, false)
    }).catch((reason) => {
      return callback(reason, true)
    })
  }

  public createPostRequest<K>(endpoint: string, body: any, callback: (result: K, error: boolean) => void, xsts?: string, hash?: string): void {
    axios.post(endpoint, body, {
      headers: createHeader(xsts ?? this.client.getAuth().getXsts(), hash ?? this.client.getAuth().getHash()),
    }).then((result) => {
      return callback(result.data, false)
    }).catch((reason) => {
      return callback(reason, true)
    })
  }
}

export {
  RequestManager,
}
