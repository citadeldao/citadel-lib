import * as oasis from '@oasisprotocol/client'
import { generateContext } from './functions'

export const signTxByPrivateKey = async (rawTransaction, privateKey) => {
        const src = oasis.signature.NaclSigner.fromSecret(Buffer.from(privateKey, 'base64'), 'this key is not important')
        let signer = new oasis.signature.BlindContextSigner(src)
        const context = await generateContext()
        let signedTx = await oasis.signature.signSigned(signer, context, rawTransaction)
        return signedTx
}
// 300144
// FLF8IEyQFe/5RaaNeiHLziOxRsO3aOWc8mdYkJg0SLMKd9RCK4f0cCfIL8ZR2/IDC+o4wf75qK0rEsFfjatIzw==	
// oasis1qqctax55zq4s59fxem8cx86uac2skkevvg57q8dr
//node  oasis1qq3xrq0urs8qcffhvmhfhz4p0mu7ewc8rscnlwxe
