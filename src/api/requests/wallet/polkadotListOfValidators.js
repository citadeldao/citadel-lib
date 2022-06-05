export const polkadotListOfValidators = ({ address }) => ({
  url: `/transactions/polkadot/${address}/prepareListOfValidators`,
  method: 'get',
});
