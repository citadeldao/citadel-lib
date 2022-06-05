import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import { generateMnemonic } from 'bip39'
import errors from '../../errors'

export default (length = 12) => {
  checkInitialization()
  checkTypes(['length', length, ['String', 'Number'], true])

  if (length % 3 !== 0 || length < 12 || length > 24) {
    errors.throwError('WrongArguments', {
      message: `Length must be between 12 and 24, a multiple of 3. Got '${length}'`,
    })
  }

  const entropy = (length * 32) / 3
  return generateMnemonic(entropy)
}
