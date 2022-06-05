export const polkadotPrepareClaimUnstaked = (data) => ({
  url: `/transactions/polkadot/${data.address}/prepareClaimUnstaked`,
  method: 'get',
});
