// Bucketlist's Supabase project and the Sign in with Apple web client. The publishable key is
// public by design (row level security protects the data); never put a secret key here.

export const SUPABASE_URL = 'https://uacoxmwzucftzjbynfrq.supabase.co'
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_pY_Tmogg0N1SMtBBfZASwA_Xj-4zL2r'

/** Services ID for Sign in with Apple on the web (developer.apple.com → Identifiers → Services IDs). */
export const APPLE_SERVICES_ID = 'one48.bucketlist.web'
export const PAGE_URL = 'https://www.one48.de/bucketlist/verbinden'

/**
 * Where an approval may send the user back to: Claude, ChatGPT and local clients (Claude Code,
 * MCP Inspector). Anyone can register an OAuth client, so a request with any other callback is
 * refused here: it could be someone trying to get access to your Bucketlist.
 */
export function isTrustedRedirect(uri: string): boolean {
  try {
    const url = new URL(uri)
    if (['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) return url.protocol === 'http:' || url.protocol === 'https:'
    return url.protocol === 'https:' && ['claude.ai', 'claude.com', 'chatgpt.com'].includes(url.hostname)
  } catch {
    return false
  }
}

/** "Claude", "ChatGPT" or the host, for the consent text. */
export function assistantName(uri: string, clientName: string): string {
  try {
    const host = new URL(uri).hostname
    if (host === 'claude.ai' || host === 'claude.com') return 'Claude'
    if (host === 'chatgpt.com') return 'ChatGPT'
  } catch {
    // fall through
  }
  return clientName || 'Ein KI-Assistent'
}
