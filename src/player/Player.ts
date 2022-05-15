// Type imports.
import type { IPlayer } from '../types'
import type { Client } from '../index'
import type { Realm } from '../realm'

class Player {
  protected readonly client: Client
  protected readonly realm: Realm
  protected readonly IPlayer: IPlayer

  public constructor(client: Client, realm: Realm, player: IPlayer) {
    this.client = client
    this.realm = realm
    this.IPlayer = player
  }

  /**
   * Gets the players raw json response.
   * @returns Raw json.
   */
  public getIPlayer(): IPlayer {
    return this.IPlayer
  }

  /**
   * Get the players xuid.
   * @returns Xuid.
   */
  public getXuid(): string {
    return this.IPlayer.uuid
  }

  /**
   * Checks if the player is a operator.
   * @returns Boolean.
   */
  public isOperator(): boolean {
    return this.IPlayer.operator
  }

  /**
   * Checks if the player is online.
   * @returns Boolean.
   */
  public isOnline(): boolean {
    return this.IPlayer.online
  }
}

export {
  Player,
}
