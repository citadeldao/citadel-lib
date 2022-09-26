import {
  checkTypes,
  checkInitialization,
  checkNetworkOrToken,
  checkWalletId,
  checkTokensSupport,
  checkNetworkToken,
} from '../../helpers/checkArguments'
import errors from '../../errors'
import walletInstances from '../../walletInstances'

/**
 * Returns information on the token (balances, rewards, etc)
 *
 * @param walletId STRING, NUMBER (REQUIRED) - wallet id
 * @param token STRING (REQUIRED) - token key
 * @param info  STRING (REQUIRED) - information category, see getTokenInfos method for a list of available categories

 * @returns Returns OBJECT
 * When called outside, result wraps into an object of the form { result: 'success', data: returnedValue, error: null }
 * @example
  const response = await citadel.callTokenInfo('12345', 'bsc_xct', 'marketcap')

  // =>
  {
    "result": "success",
    "data": {
      "yield": 107.90238338513744,
      "priceBtc": "0.0000030150516",
      "priceUsd": "0.19157923",
      "inflation": 8,
      "marketCap": 4134464.22851,
      "stakingRate": 68.7097,
      "priceBtcDelta24": "-0.00000047055899",
      "priceUsdDelta24": "-0.019504541",
      "unbondingPeriod": "",
      "volumeDelta24Btc": "1.15",
      "volumeDelta24Usd": "71699.87",
      "circulatingSupply": 21580962.761503,
      "priceBtcDelta24pct": -13.5,
      "priceUsdDelta24pct": -9.24
    },
    "error": null
  }
 */

export const callTokenInfo = (walletId, token, infoName, options) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['token', token, ['String'], true],
    ['infoName', infoName, ['String'], true],
    ['options', options, ['Object']]
  )
  checkNetworkOrToken(token)
  checkWalletId(walletId)

  const walletInstance = walletInstances.getWalletInstanceById(walletId)
  checkTokensSupport(walletInstance.net)
  checkNetworkToken(walletInstance.net, token)

  if (!walletInstance.getTokenInfos(token).includes(infoName)) {
    errors.throwError('MethodNotSupported', {
      message: `"${token}" token is not support "${infoName}" info`,
    })
  }

  // call walletInstance method (some functions contain walletListUpdated event inside)
  return walletInstance.callTokenInfo(token, infoName, options)
}
