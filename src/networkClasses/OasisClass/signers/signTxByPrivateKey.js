import * as oasis from '@oasisprotocol/client'

export const signTxByPrivateKey = async (rawTransaction, privateKey) => {
  // console.log(33,oasis);
  // const nic = new oasis.client.NodeInternal('https://grpc.oasis.dev');
  // // const context = await nic.consensusGetChainContext();

  // // const dst = oasis.signature.NaclSigner.fromRandom('this key is not important');
  // const src = oasis.signature.NaclSigner.fromSecret(Buffer.from(privateKey,'base64'), 'this key is not important')

  //       const chainContext = await nic.consensusGetChainContext();
  //       console.log('chain context', chainContext);

  //       const genesis = await nic.consensusGetGenesisDocument();
  //       const ourChainContext = await oasis.genesis.chainContext(genesis);
  //       console.log('computed from genesis', ourChainContext);
  //       if (ourChainContext !== chainContext) throw new Error('computed chain context mismatch');

  //       const nonce =
  //           (await nic.consensusGetSignerNonce({
  //               account_address: await oasis.staking.addressFromPublicKey(src.public()),
  //               height: oasis.consensus.HEIGHT_LATEST,
  //           })) ?? 0;
  //       console.log('nonce', nonce);

  //       const account = await nic.stakingAccount({
  //           height: oasis.consensus.HEIGHT_LATEST,
  //           owner: await oasis.staking.addressFromPublicKey(src.public()),
  //       });
  //       console.log('account', account);
  //       if ((account.general?.nonce ?? 0) !== nonce) throw new Error('nonce mismatch');

  //       const tw = oasis.staking.reclaimEscrowWrapper();
  //       tw.setNonce(account.general?.nonce ?? 0);
  //       tw.setFeeAmount(oasis.quantity.fromBigInt(0n));
  //       console.log(77,await oasis.staking.addressFromBech32('oasis1qq3xrq0urs8qcffhvmhfhz4p0mu7ewc8rscnlwxe'));
  //       tw.setBody({
  //         account: await oasis.staking.addressFromBech32('oasis1qq3xrq0urs8qcffhvmhfhz4p0mu7ewc8rscnlwxe'),
  //         shares: oasis.quantity.fromBigInt(10n),
  //       });
        

  //       const gas = await tw.estimateGas(nic, src.public());
  //       console.log('gas', gas);
  //       tw.setFeeGas(gas);
  //       console.log('transaction', tw.transaction,);
  //       console.log(22,src);
  //       console.log(22,chainContext);
  //       console.log(22,tw);
  //       console.log(777,oasis);
  //       await tw.sign(new oasis.signature.BlindContextSigner(src), chainContext);
  //       console.log(111,Buffer.from(tw.signedTransaction.signature.signature).toString('hex'));
        
  //       console.log('singed transaction', tw.signedTransaction);
  //       console.log('hash', await tw.hash());

  //       await tw.submit(nic);
  //       console.log('sent');

        const nic = new oasis.client.NodeInternal('https://grpc.oasis.dev')
        const src = oasis.signature.NaclSigner.fromSecret(Buffer.from(privateKey, 'base64'), 'this key is not important')
        const chainContext = await nic.consensusGetChainContext()
        let signer = new oasis.signature.BlindContextSigner(src)
        if(rawTransaction.body.amount){
          rawTransaction.body.amount = new Uint8Array(Object.values(rawTransaction.body.amount));
        }

        if(rawTransaction.body.shares){
          rawTransaction.body.shares = new Uint8Array(Object.values(rawTransaction.body.shares));
        }
        
        if(rawTransaction.body.to){
          rawTransaction.body.to = new Uint8Array(Object.values(rawTransaction.body.to));
        }

        if(rawTransaction.body.account){
          rawTransaction.body.account = new Uint8Array(Object.values(rawTransaction.body.account));
        }
        rawTransaction.fee.amount = new Uint8Array(Object.values([0]));
        console.log('test',rawTransaction);
        let signedTX = await signSignedTransaction(signer, chainContext, rawTransaction)
        return signedTX
}

async function signSignedTransaction(signer, chainContext, transaction) {

  let TRANSACTION_SIGNATURE_CONTEXT = 'oasis-core/consensus: tx'
  const context = await oasis.signature.combineChainContext(TRANSACTION_SIGNATURE_CONTEXT, chainContext)
  let tx = await oasis.misc.toCBOR(transaction)
  return await oasis.signature.signSigned(signer, context, tx)
}

// 300144
// FLF8IEyQFe/5RaaNeiHLziOxRsO3aOWc8mdYkJg0SLMKd9RCK4f0cCfIL8ZR2/IDC+o4wf75qK0rEsFfjatIzw==	
// oasis1qqctax55zq4s59fxem8cx86uac2skkevvg57q8dr
//node  oasis1qq3xrq0urs8qcffhvmhfhz4p0mu7ewc8rscnlwxe
