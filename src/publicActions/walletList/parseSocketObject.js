import { checkTypes, checkInitialization } from '../../helpers/checkArguments'
import libCore from '../../libCore'

export default async (eventName, socketObject) => {
  checkInitialization()
  checkTypes(
    ['eventName', eventName, ['String'], true],
    ['socketObject', socketObject, ['Object'], true]
  )
  return await libCore.parseSocketObject(eventName, socketObject)
}
