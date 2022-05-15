export function createHeader(xsts: string, hash: string): any {
  return {
    "cache-control": "no-cache",
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.5",
    "content-type": "application/json",
    "client-version": "1.18.30",
    "Authorization": `XBL3.0 x=${hash};${xsts}`,
    "User-Agent": "MCPE/UWP",
  }
}