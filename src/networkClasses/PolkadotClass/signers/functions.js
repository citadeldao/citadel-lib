import { LEDGER_ERRORS, ERROR_CODES } from '../../../constants'
import errors from '../../../errors'

export function ledgerErrorHandler({ error, rightApp }) {
    if(error.message.includes(LEDGER_ERRORS.POLKADOT.REJECT_ERROR_MESSAGE)){
      errors.throwError('LedgerError', {
        message: error.error_message,
        code: ERROR_CODES.LEDGER.REJECT_CODE,
      })
    }
    if(LEDGER_ERRORS.POLKADOT.WRONG_APP_CODES.includes(+error.statusCode)){
      errors.throwError('LedgerError', {
        message: error.error_message,
        code: ERROR_CODES.LEDGER.WRONG_APP,
        data: {
          rightApp: rightApp[0]
        }
      })
    }else{
      errors.throwError('LedgerError', {
        message: error.error_message,
        code: ERROR_CODES.UNKNOWN_ERROR,
      })
    }
  }