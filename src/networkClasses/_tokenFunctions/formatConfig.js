// token formats and their action types. In the future will come from the backend

export const formatConfig = {
  bep20: {
    actions: {
      transfer: 'transfer_default',
    },
    infos: {
      balance: 'balance_default',
      transactions: 'transactions_default',
    },
  },
  erc20: {
    actions: {
      transfer: 'transfer_default',
    },
    infos: {
      balance: 'balance_default',
      transactions: 'transactions_default',
    },
  },
  ics20: {
    actions: {
      transfer: 'transfer_default',
    },
    infos: {
      balance: 'balance_default',
      transactions: 'transactions_default',
    },
  },
  cw20: {
    actions: {
      transfer: 'transfer_default',
    },
    infos: {
      balance: 'balance_default',
      transactions: 'transactions_default',
    },
  },
  snip20: {
    actions: {
      transfer: 'transfer_scrt',
    },
    infos: {
      balance: 'balance_scrt',
      transactions: 'transactions_scrt',
    },
  },
  trc10: {
    actions: {
      transfer: 'transfer_default',
    },
    infos: {
      balance: 'balance_default',
      transactions: 'transactions_default',
    },
  },
  trc20: {
    actions: {
      transfer: 'transfer_default',
    },
    infos: {
      balance: 'balance_default',
      transactions: 'transactions_default',
    },
  },
  suiAsset: {
    actions: {
      transfer: 'transfer_default',
    },
    infos: {
      balance: 'balance_default',
      transactions: 'transactions_default',
    },
  },
}
