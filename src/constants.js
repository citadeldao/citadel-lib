export const GRPC_WEB_URL = 'https://api-secret.citadel.one:9091/'

export const USERS_SOCKET_EVENT_NAMES = {
  TRANSACTION_EVENTS_CLIENT: 'transaction-events-client',
  MESSAGE_FROM_APP: 'message-from-app',
  ADDRESS_BALANCE_UPDATED_CLIENT: 'address-balance-updated-client',
  MEMPOOL_ADD_TX_CLIENT: 'mempool-add-tx-client',
  MEMPOOL_REMOVE_TX_CLIENT: 'mempool-remove-tx-client',
  CHANGE_EMAIL_CLIENT: 'change-email-client',
  NOTIFICATIONS_CLIENT: 'notifications-client'
}

export const MARKETCAPS_SOCKET_EVENT_NAMES = {
  MARKETCAP_UPDATE_CLIENT: 'marketCap-update-client',
}

export const LIB_EVENT_NAMES = {
  WALLET_LIST_UPDATED: 'walletListUpdated',
  STORAGE_CHANGED_EXTERNALLY: 'storageChangedExternally',
  SOCKET_EVENT: 'socketEvent',
  TOKEN_REFRESHED: 'tokenRefreshed',
  REFRESHED_TOKEN_EXPIRED: 'refreshedTokenExpired',
  LEDGER_SIGNING_FINISHED: 'ledgerSigningFinished',
  LEDGER_SIGNING_STARTED: 'ledgerSigningStarted',
  EXTENSION_TX_MIDDLEWARE:'extensionTxMiddleware'
}

// TODO: generate next 2 consts automatically
// computed properties to associate event with its callback in the state
export const LIB_EVENT_CALLBACK_NAMES = {
  [LIB_EVENT_NAMES.WALLET_LIST_UPDATED]: 'walletListUpdatedCallback',
  [LIB_EVENT_NAMES.SOCKET_EVENT]: 'socketEventCallback',
  [LIB_EVENT_NAMES.TOKEN_REFRESHED]: 'tokenRefreshedCallback',
  [LIB_EVENT_NAMES.REFRESHED_TOKEN_EXPIRED]: 'refreshedTokenExpiredCallback',
  [LIB_EVENT_NAMES.LEDGER_SIGNING_FINISHED]: 'ledgerSigningFinisedCallback',
  [LIB_EVENT_NAMES.LEDGER_SIGNING_STARTED]: 'ledgerSigningStartedCallback',
  [LIB_EVENT_NAMES.STORAGE_CHANGED_EXTERNALLY]:
    'storageChangedExternallyCallback',
  [LIB_EVENT_NAMES.EXTENSION_TX_MIDDLEWARE]: 'extensionTxMiddlewareCallback',
}

export const LIB_EVENT_BLOCK_FLAGS = {
  [LIB_EVENT_NAMES.WALLET_LIST_UPDATED]: 'blockWalletListUpdatedEvent',
  [LIB_EVENT_NAMES.SOCKET_EVENT]: 'blockSocketEvent',
  [LIB_EVENT_NAMES.TOKEN_REFRESHED]: 'blockTokenRefreshed',
  [LIB_EVENT_NAMES.REFRESHED_TOKEN_EXPIRED]: 'blockRefreshedTokenExpired',
  [LIB_EVENT_NAMES.LEDGER_SIGNING_FINISHED]: 'blockLedgerSigningFinised',
  [LIB_EVENT_NAMES.LEDGER_SIGNING_STARTED]: 'blockLedgerSigningStarted',
  [LIB_EVENT_NAMES.STORAGE_CHANGED_EXTERNALLY]: 'blockStorageChangedExternally',
  DELAY_WALLET_LIST_UPDATE_DETAIL: 'delayWalletListUpdateDetail'
}

export const CACHE_NAMES = {
  SUPPORTED_NETWORK_KEYS: 'supportedNetworkKeys',
  NETWORKS_CONFIG: 'networksConfig',
  RATES: 'rates',
  MARKETCAPS: 'marketcaps',
  DAO_SUPPORTED_NETWORKS: 'daoSupportedNetworks',
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

export const SECRET_NET_KEY = 'secret'

export const WALLET_TYPES = {
  TREZOR: 'trezor',
  LEDGER: 'ledger',
  ONE_SEED: 'oneSeed',
  PRIVATE_KEY: 'privateKey',
  PUBLIC_KEY: 'publicKey',
  METAMASK: 'metamask',
  KEPLR: 'keplr',
  SEED_PHRASE: 'seedPhrase',
}

export const HARDWARE_SIGNER_WALLET_TYPES = [
  WALLET_TYPES.TREZOR,
  WALLET_TYPES.LEDGER,
]

export const PRIVATE_KEY_SIGNER_WALLET_TYPES = [
  WALLET_TYPES.ONE_SEED,
  WALLET_TYPES.PRIVATE_KEY,
  WALLET_TYPES.SEED_PHRASE,
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

export const APP_MESSAGE_TYPES = {
  SUCCESS: 'SUCCESS',
  ERROR: 'FAILED',
}

export const KEPLR = {
  ERRORS: {
    REJECTED: 'Request rejected',
  },
}


export const LEDGER_ERRORS = {
  COSMOS: {
    EMPTY_LEDGER_APP: 'BOLOS',
    WRONG_APP_CODE: '36864',
    REJECT_ERROR_CODE: '27014'
  },
  ETH: { 
    WRONG_APP_CODES: [28160, 27904, 28437, 27157, 25873],
    REJECT_ERROR_CODES: [27013]
  },
  ICON: { 
    WRONG_APP_CODES: [28160, 27904, 27157, 25871, 25873, 25857],
    REJECT_ERROR_CODES: [27013]
  },
  OASIS: {
    EMPTY_LEDGER_APP: 'BOLOS',
    WRONG_APP_CODE: '36864',
    REJECT_ERROR_CODE: '27014'
  },
  POLKADOT: { 
    WRONG_APP_CODES: [28160, 28161],
    REJECT_ERROR_MESSAGE: 'UserRefusedOnDevice'
  },
  TEZOS: { 
    WRONG_APP_CODES: [28160, 28161],
    REJECT_ERROR_CODES: [27013]
  },
  TRON: { 
    WRONG_APP_CODES: [28160, 27157, 27904, 28437, 25873, 25870, 27392],
    REJECT_ERROR_CODES: [27013]
  },
  BTC: { 
    WRONG_APP_CODES: [28160, 27904, 25873, 27906, 28161],
    REJECT_ERROR_CODES: [27013]
  },
  SUI: {
    WRONG_APP_CODES: [28161, 28160, 27904, 27157, 25871, 25873, 25857],
    REJECT_ERROR_CODES: [27013]
  },
  COMMON: {
    BUSY_TRANSPORT_MESSAGE: 'already open',
    BUSY_TRANSPORT_MESSAGE1: 'ailed to open'
  }
} 


export const ERROR_CODES = {
  UNKNOWN_ERROR: 901,
  //starts from 200
  LEDGER: {
    WRONG_APP: 200,
    REJECT_CODE: 201,
    BUSY_TRANSPORT: 202
  }
}
