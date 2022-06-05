import networks from '../../../..'

export function getFeeObject(fee) {
  fee = fee || 0.2
  return {
    upload: {
      amount: [{ amount: '2000000', denom: 'uscrt' }],
      gas: '2000000',
    },
    init: {
      amount: [{ amount: '500000', denom: 'uscrt' }],
      gas: '500000',
    },
    exec: {
      amount: [
        {
          amount: `${+fee * 10 ** networks.getNetworkClass('secret').decimals}`,
          denom: 'uscrt',
        },
      ],
      gas: '500000',
    },
    send: {
      amount: [{ amount: '80000', denom: 'uscrt' }],
      gas: '80000',
    },
  }
}
