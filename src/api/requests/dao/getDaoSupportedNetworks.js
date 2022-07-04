// function returns request parameters for the axios instance.
export const getDaoSupportedNetworks = () => ({
  // backend domain is in the axios instance
  url: `/dao/supported_networks`,
  method: 'get',
});