# lib-citadel

Crypto wallets management module for [Citadel.one](https://app.citadel.one/) client application.
Provides a standardized interface for working with wallets of various crypto networks.

## Features

- Adding wallets in various ways
- Obtaining information on networks and tokens
- Wallet list management
- Actions with the wallet (receipt of balance, transfer, staking, etc.)
- The module does not store private keys and dervation paths
- Supported networks: "Akash", "Axelar", "Band", "Bitsong", "Binance Smart Chain", "Bitcoin", "Cerberus", "Cheqd", "Chihuahua", "Comdex", "Cosmos Hub", "Crescent Network", "e-Money", "Ethereum", "Evmos", "Fetch.ai", "GBridge", "ICON", "Injective", "IOST", "IRIS Network", "Juno", "Kava", "Ki Chain", "Konstellation", "Lum", "AssetMantle", "Osmosis", "Persistence", "Polkadot", "Regen", "Rizon", "Secret", "Sentinel", "Sifchain", "Stargaze", "Starname", "Tezos", "Umee"

## Installation

```shell
npm i --save @citadeldao/lib-citadel
```

## How to use

```js
// Import default object with methods
import citadel from '@citadel/citadel-lib'

// init
await citadel.init({
  backendUrl,
})

// Get list of wallets with balances
const { data: wallets } = await getWalletList()

// Call the required method
const response = citadel.generateMnemonic(24)
```

## Return value format

### On success

```js
{
  result: "success",
  data: "m/44'/60'/0'/0/0",
  error: null
}
```

### On error

```js
{
  result: "error",
  data: null,
  error: "WrongArguments: Invalid type of argument 'net'. Expected 'String', got 'Number'"
}
```

## Structure

![Library structure](https://gitlab.com/citadel1/citadel-lib/-/raw/dev/structure.png)
