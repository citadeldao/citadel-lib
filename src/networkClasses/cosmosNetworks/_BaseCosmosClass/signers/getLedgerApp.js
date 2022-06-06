import Ledger from '@lunie/cosmos-ledger'

export const getLedgerApp = async () => {
  // add global btc ledger app to avoid ledger reconnect error
  let ledger
  if (
    // ledger instance already exist
    global.ledger_cosmos &&
    // existing instance is valid
    !global.ledger_cosmos.cosmosApp.transport._disconnectEmitted
  ) {
    ledger = global.ledger_cosmos
    return ledger
  }
  // create ledger instance
  ledger = await new Ledger().connect()
  // set instance to global
  global.ledger_cosmos = ledger
  return ledger
}
