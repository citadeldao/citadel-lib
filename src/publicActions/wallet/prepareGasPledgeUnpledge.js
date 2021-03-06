import errors from '../../errors'
import {
  checkTypes,
  checkInitialization,
  checkWalletId,
} from '../../helpers/checkArguments'
import walletInstances from '../../walletInstances'

export const prepareGasPledgeUnpledge = async (walletId, type, amount) => {
  // checks
  checkInitialization()
  checkTypes(
    ['walletId', walletId, ['String', 'Number'], true],
    ['type', type, ['String'], true],
    ['amount', amount, ['String', 'Number'], true]
  )
  checkWalletId(walletId)

  const types = ['pledge', 'unpledge']

  !types.includes(type) &&
    errors.throwError('WrongArguments', {
      message: `Invalid type. Expected "${types.join('", "')}", got "${type}"`,
    })

  // call wallet instance method
  if (type === 'pledge') {
    return await walletInstances
      .getWalletInstanceById(walletId)
      .prepareGasPledge(amount)
  }

  if (type === 'unpledge') {
    return await walletInstances
      .getWalletInstanceById(walletId)
      .prepareGasUnpledge(amount)
  }
}
