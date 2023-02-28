import type { AuthResponse } from '@mcbeutils/beauth'

export interface Authorize {
  mcbeChain: AuthResponse
  defaultChain: AuthResponse
}