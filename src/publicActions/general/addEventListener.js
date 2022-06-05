import errors from '../../errors'
import { checkTypes } from '../../helpers/checkArguments'
import { EVENT_NAMES } from '../../constants'
import state from '../../state'

export default (eventName, callback) => {
  checkTypes(
    ['eventName', eventName, ['String'], true],
    ['callback', callback, ['Function'], true]
  )

  if (!Object.values(EVENT_NAMES).includes(eventName)) {
    errors.throwError('WrongArguments', {
      message: `Event "${eventName}" not supported. Supported events: ${JSON.stringify(
        Object.values(EVENT_NAMES)
      )}`,
    })
  }

  if (eventName === 'walletListUpdated') {
    state.setState('walletListUpdatedCallback', callback)
    return
  }
}
