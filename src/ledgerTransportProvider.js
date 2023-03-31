import state from "./state";
import WebHidTransport from '@ledgerhq/hw-transport-webhid'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import { LedgerFlutterTransport } from "./ledgerFlutterTransport";
import errors from './errors'
import { LEDGER_ERRORS, ERROR_CODES } from './constants'

export const getLedgerTransport = async () => {
    if (state.getState('ledgerFlutterTransport')) {
        return new LedgerFlutterTransport();
    }
    try{
        return await WebHidTransport.isSupported()
        ? await WebHidTransport.create(10000)
        : await TransportWebUSB.create(10000)
    }catch(e){
      console.log('qaq1',e);
        ledgerErrorHandler(e)
    }
}

function ledgerErrorHandler(error){
  console.log('qaq2',error);
    if(error.includes(LEDGER_ERRORS.COMMON.BUSY_TRANSPORT_MESSAGE)){
        errors.throwError('LedgerError', {
          message: error.error_message || error,
          code: ERROR_CODES.LEDGER.BUSY_TRANSPORT,
        })
      }else{
        errors.throwError('LedgerError', {
          message: error.error_message || error,
          code: ERROR_CODES.UNKNOWN_ERROR,
        })
      }
}
