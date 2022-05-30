export function createHeader(xsts: string, hash: string): any {
  return {
    'x-xbl-contract-version': 2,
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.5",
    "client-version": "1.18.31",
    "Authorization": `XBL3.0 x=${hash};${xsts}`,
    "User-Agent": "MCPE/UWP",
  }
}