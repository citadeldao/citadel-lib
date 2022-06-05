import libCore from '../../libCore'
import { checkTypes } from '../../helpers/checkArguments'

export default (clearCache) => {
  checkTypes(['clearCache', clearCache, ['Boolean']])
  libCore.resetLibrary(clearCache)
}
