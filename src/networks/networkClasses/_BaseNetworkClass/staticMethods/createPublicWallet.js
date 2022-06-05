import { WALLET_TYPES } from '../../../../constants'

export default function (walletInfo) {
  return {
    net: this.net,
    address: walletInfo.address,
    publicKey: null,
    type: WALLET_TYPES.PUBLIC_KEY,
    // update network info
    code: this.code,
    methods: this.methods,
    networkName: this.networkName,
    ...(this.fee_key && { fee_key: this.fee_key }),
    ...(this.bridges && { bridges: this.bridges }),
  }
}
