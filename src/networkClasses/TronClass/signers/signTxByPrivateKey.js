import TronWeb from 'tronweb'

export const signTxByPrivateKey = async (rawTransaction, privateKey) => {
        const tronInstance = new TronWeb({
                fullHost: 'https://api.trongrid.io',
                privateKey: privateKey
            })
        const signedTx = await tronInstance.trx.sign(rawTransaction, privateKey)
        return signedTx
}