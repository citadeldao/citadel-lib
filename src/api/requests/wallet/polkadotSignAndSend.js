// function returns request parameters for the axios instance.
export const polkadotSignAndSend = ({ signer, unsignedTx, signature, payload, mem_tx_id }) => {
  return {
    // backend domain is in the axios instance
  url: `/transactions/polkadot/${signer}/signAndSend`,
    method: 'post',
    data: {
      unsignedTx,
      signature,
      payload,
      mem_tx_id
    },
  };
};