import { LEDGER_ERRORS, ERROR_CODES } from '../../../constants'
import errors from '../../../errors'

export const generateContext = async () => {
  // dynamic import of large module (for fast init)
  const { signature, client } = await import('@oasisprotocol/client')

  const nic = new client.NodeInternal('https://grpc.oasis.dev')
  const chainContext = await nic.consensusGetChainContext()
  let TRANSACTION_SIGNATURE_CONTEXT = 'oasis-core/consensus: tx'
  const context = await signature.combineChainContext(
    TRANSACTION_SIGNATURE_CONTEXT,
    chainContext
  )
  return context
}
export const bufFromU8 = (u8) => {
  return Buffer.from(u8.buffer, u8.byteOffset, u8.byteLength)
}
export const u8FromBuf = (buf) => {
  return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength)
}

export const tranformTransaction = async (transaction) => {
  if (transaction.body.amount) {
    transaction.body.amount = new Uint8Array(
      Object.values(transaction.body.amount)
    )
  }

  if (transaction.body.shares) {
    transaction.body.shares = new Uint8Array(
      Object.values(transaction.body.shares)
    )
  }

  if (transaction.body.to) {
    transaction.body.to = new Uint8Array(Object.values(transaction.body.to))
  }

  if (transaction.body.account) {
    transaction.body.account = new Uint8Array(
      Object.values(transaction.body.account)
    )
  }
  transaction.fee.amount = new Uint8Array(Object.values(transaction.fee.amount));
  // dynamic import of large module (for fast init)
  const { misc } = await import('@oasisprotocol/client')
  let tx = await misc.toCBOR(transaction)
  return tx
}

export function ledgerErrorHandler({ appInfo, resp, rightApp }) {
  if(resp.return_code === LEDGER_ERRORS.OASIS.REJECT_ERROR_CODE){
    errors.throwError('LedgerError', {
      message: resp.error_message,
      code: ERROR_CODES.LEDGER.REJECT_CODE,
    })
  }
  if(appInfo.return_code == LEDGER_ERRORS.OASIS.WRONG_APP_CODE){
    errors.throwError('LedgerError', {
      message: resp.error_message,
      code: ERROR_CODES.LEDGER.WRONG_APP,
      data: {
        currentApp: appInfo.appName === LEDGER_ERRORS.OASIS.EMPTY_LEDGER_APP ? null : appInfo.appName,
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
