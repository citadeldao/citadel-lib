import TrezorConnect from 'trezor-connect'

// trezor helpers
export const prepareTrezorConnection = async () => {
  // check global trezor flag to avoid trezor reconnect error
  if (!global.isTrezorInit) {
    // connect trezor
    await TrezorConnect.init({
      connectSrc: 'https://connect.trezor.io/8/',
      lazyLoad: true, // this param will prevent iframe injection until TrezorConnect.method will be called
      manifest: {
        email: 'citadel.one@gmail.com',
        appUrl: 'http://citadel.one/',
      },
    })

    global.isTrezorInit = true
  }
}
