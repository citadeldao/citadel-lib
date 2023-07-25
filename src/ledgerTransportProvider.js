import state from "./state";

import WebHidTransport from '@ledgerhq/hw-transport-webhid'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import BluetoothTransport from "@ledgerhq/hw-transport-web-ble";

import { LedgerFlutterTransport } from "./ledgerFlutterTransport";
import errors from './errors'
import { LEDGER_ERRORS, ERROR_CODES } from './constants'

export const getLedgerTransport = async (transportType = 'usb') => {
    if (state.getState('ledgerFlutterTransport')) {
        return new LedgerFlutterTransport();
    }
    try{
      if(transportType === 'usb'){
        return await WebHidTransport.isSupported()
        ? await WebHidTransport.create(10000)
        : await TransportWebUSB.create(10000)
      }
      if(transportType === 'bt'){
        if(!window.btTransport){
          window.btTransport = await BluetoothTransport.create();
          window.btTransport.on('disconnect', () => {
            window.btTransport = null;
          });
    
        }
        return window.btTransport
      }
    }catch(e){
        ledgerErrorHandler(e)
    }
}

function ledgerErrorHandler(error){  
    if(error.message || error.includes(LEDGER_ERRORS.COMMON.BUSY_TRANSPORT_MESSAGE) ||
    error.message || error.includes(LEDGER_ERRORS.COMMON.BUSY_TRANSPORT_MESSAGE1)){
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
