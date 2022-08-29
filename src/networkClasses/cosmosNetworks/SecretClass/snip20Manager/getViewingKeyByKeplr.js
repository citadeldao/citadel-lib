import errors from '../../../../errors'

export const getViewingKeyByKeplr = async () => {
  if (window.keplr) {
    // enable keplr
    // >>>>
    await window.keplr.enable
    // >>>>
    if ('Signer mismatched')
      'Please change account in Keplr to sign transaction'
    return
  }
  // >>>>
  errors.throwError('KeplrError', {
    message: 'Keplr not found in your browser',
  })
}
