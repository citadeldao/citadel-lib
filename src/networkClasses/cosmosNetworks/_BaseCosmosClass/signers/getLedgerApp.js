export const getLedgerApp = async (/* transportType */) => {
  const { default: Ledger } = await import('@lunie/cosmos-ledger')
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
