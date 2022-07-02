// function returns request parameters for the axios instance.
export const polkadotSignAndSend = ({ signer, unsignedTx, signature, payload }) => {
  return {
    // backend domain is in the axios instance
  url: `/transactions/polkadot/${signer}/signAndSend`,
    method: 'post',
    data: {
      unsignedTx,
      signature,
      payload,
    },
  };
};