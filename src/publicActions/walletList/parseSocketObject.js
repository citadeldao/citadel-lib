import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import socketManager from '../../socketManager'

export const parseSocketObject = async (eventName, socketObject) => {
  // checks
  checkInitialization()
  checkTypes(
    ['eventName', eventName, ['String'], true],
    ['socketObject', socketObject, ['Object'], true]
  )

  // return socketManager (function already contains updateWalletList event inside)
  return await socketManager.parseSocketObject(eventName, socketObject)
}
