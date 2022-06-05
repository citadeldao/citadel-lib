export const polkadotSignAndSend = ({ signer, unsignedTx, signature, payload }) => {
  return {
    url: `/transactions/polkadot/${signer}/signAndSend`,
    method: 'post',
    data: {
      unsignedTx,
      signature,
      payload,
    },
  };
};