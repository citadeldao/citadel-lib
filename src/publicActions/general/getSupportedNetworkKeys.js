import { checkInitialization } from '../../helpers/checkArguments'
import state from '../../state'

export default () => {
  checkInitialization()
  return state.getState('supportedNetworkKeys').sort()
}
