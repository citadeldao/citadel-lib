export const getDaoCalculatorData = ({ address }) => ({
  url: `/dao/holder/${address}/calc`,
  method: 'get',
});
