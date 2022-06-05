// secret node
export const COSM_WASM_CLIENT_HTTP_URL = 'https://api-secret.citadel.one'

export const EVENT_NAMES = {
  walletListUpdated: 'walletListUpdated',
}

export const GET_WALLET_LIST_TYPES = {
  CACHE: 'lazy',
  WALLETS: 'wallets',
  DETAIL: 'detail',
}

export const DELEGATION_TYPES = {
  STAKE: 'stake',
  UNSTAKE: 'unstake',
  REDELEGATE: 'redelegate',
}

export const WALLET_TYPES = {
  TREZOR: 'trezor',
  LEDGER: 'ledger',
  ONE_SEED: 'oneSeed',
  PRIVATE_KEY: 'privateKey',
  PUBLIC_KEY: 'publicKey',
  METAMASK: 'metamask',
  KEPLR: 'keplr',
}

export const HARDWARE_SIGNER_WALLET_TYPES = [
  WALLET_TYPES.TREZOR,
  WALLET_TYPES.LEDGER,
]

export const PRIVATE_KEY_SIGNER_WALLET_TYPES = [
  WALLET_TYPES.ONE_SEED,
  WALLET_TYPES.PRIVATE_KEY,
]

export const VIEWING_KEYS_TYPES = {
  SIMPLE: 'simple',
  CUSTOM: 'custom',
  RANDOM: 'random',
}

export const STATUSES = {
  SUCCESS: 'success',
  ERROR: 'error',
}
