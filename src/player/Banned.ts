// Type imports.
import type { ProfileUsers } from '../types'
import type { Client } from '../index'
import type { Realm } from '../realm'

// Regular imports.
import { Endpoints } from '../Constants'

class Banned {
  protected readonly client: Client
  protected readonly realm: Realm
  protected readonly xuid: string
  protected readonly cache = new Map<string, string>()

  public constructor(client: Client, realm: Realm, xuid: string) {
    this.client = client
    this.realm = realm
    this.xuid = xuid
  }

  /**
   * Get the name of the player.
   * @returns Player name.
   */
  public async getName(): Promise<string> {
    if (this.cache.has('Gamertag')) return this.cache.get('Gamertag')
    await this.fetchSettings()

    return this.cache.get('Gamertag')
  }

  public getXuid(): string {
    return this.xuid
  }

  /**
   * Get the players gamerscore.
   * @returns Gamerscore.
   */
  public async getGamerscore(): Promise<number> {
    if (this.cache.has('Gamerscore')) return parseInt(this.cache.get('Gamerscore'))
    await this.fetchSettings()

    return parseInt(this.cache.get('Gamerscore'))
  }

  /**
   * Gets the player's gamer picture url path.
   * @returns Gamer picture.
   */
  public async getGamerPicture(): Promise<string> {
    if (this.cache.has('GameDisplayPicRaw')) return this.cache.get('GameDisplayPicRaw')
    await this.fetchSettings()

    return this.cache.get('GameDisplayPicRaw')
  }

  /**
   * Get the player's account tier.
   * @returns Gold / Silver
   */
  public async getAccountTier(): Promise<string> {
    if (this.cache.has('AccountTier')) return this.cache.get('AccountTier')
    await this.fetchSettings()

    return this.cache.get('AccountTier')
  }

  /**
   * Gets and sets all player info into cache.
   * @returns 
   */
  private async fetchSettings(): Promise<void> {
    return new Promise(async (res) => {
      await this.client.requests.createGetRequest<ProfileUsers>(
        Endpoints.XBOX.GET.UserSettingsByXuid(this.xuid),
        (result, error) => {
          if (error) return new Error(`${result}`)
  
          for (const setting of result.profileUsers[0].settings) {
            this.cache.set(setting.id, setting.value)
          }

          return res()
        },
        this.client.getAuth().getDefaultChain().xsts_token,
        this.client.getAuth().getDefaultChain().user_hash,
        {
          settings: 'Gamertag,Gamerscore,GameDisplayPicRaw,AccountTier,XboxOneRep,PreferredColor,RealName,Bio,IsQuarantined'
        }
      )
    })
  }
}

export {
  Banned,
}
