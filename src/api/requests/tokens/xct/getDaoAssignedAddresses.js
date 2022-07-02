// function returns request parameters for the axios instance.
export const getDaoAssignedAddresses = ({ address }) => {
  return {
    // backend domain is in the axios instance
    url: `/dao/holder/${address}`,
    method: 'get',
  }
}

