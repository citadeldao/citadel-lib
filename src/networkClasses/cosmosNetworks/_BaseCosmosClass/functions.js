import { LEDGER_ERRORS, ERROR_CODES } from '../../../constants'
import errors from '../../../errors'

export function sortObject(obj) {
  if (obj === null) return null
  if (typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(sortObject)
  const sortedKeys = Object.keys(obj).sort()
  const result = {}
  sortedKeys.forEach((key) => {
    result[key] = sortObject(obj[key])
  })
  return result
}

export function ledgerErrorHandler({ appInfo, resp, rightApp }) {
  if(appInfo.return_code == LEDGER_ERRORS.COSMOS.WRONG_APP_CODE){
    errors.throwError('LedgerError', {
      message: resp.error_message,
      code: ERROR_CODES.LEDGER.WRONG_APP,
      data: {
        currentApp: appInfo.appName === LEDGER_ERRORS.COSMOS.EMPTY_LEDGER_APP ? null : appInfo.appName,
        rightApp: rightApp[0]
      }
    })
  }else{
    errors.throwError('LedgerError', {
      message: resp.error_message,
      code: ERROR_CODES.UNKNOWN_ERROR,
    })
  }
}