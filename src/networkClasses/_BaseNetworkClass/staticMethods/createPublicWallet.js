import state from '../../../state'
import { hashMnemonic } from '../../../helpers/hashMnemonic'
import { WALLET_TYPES } from '../../../constants'

export const createPublicWallet = function (walletInfo) {
  // returns standard created wallet object
  return {
    net: this.net,
    address: walletInfo.address,
    publicKey: null,
    // add publicKey type
    type: WALLET_TYPES.PUBLIC_KEY,
    // update network info
    code: this.code,
    methods: this.methods,
    networkName: this.networkName,
    ...(this.fee_key && { fee_key: this.fee_key }),
    ...(this.bridges && { bridges: this.bridges }),
    // additional fields for chrome extension
    ...(state.getState('isExtension') && {
      hashedMnemonic: hashMnemonic(),
    }),
  }
}
