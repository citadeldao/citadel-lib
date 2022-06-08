import networkClasses from '../../../'

export function getFeeObject(fee) {
  fee = fee || 0.001
  return {
    upload: {
      amount: [{ amount: '100000', denom: 'uscrt' }],
      gas: '100000',
    },
    init: {
      amount: [{ amount: '25000', denom: 'uscrt' }],
      gas: '25000',
    },
    exec: {
      amount: [
        {
          amount: `${
            +fee * 10 ** networkClasses.getNetworkClass('secret').decimals
          }`,
          denom: 'uscrt',
        },
      ],
      //By adjusting the proportion, you can change the speed of the transaction. But if you put too little, then the transactions will start to fail
      gas: `${+fee * 2.5 * 10 ** 7}`,
    },
    send: {
      amount: [{ amount: '4000', denom: 'uscrt' }],
      gas: '4000',
    },
  }
}
