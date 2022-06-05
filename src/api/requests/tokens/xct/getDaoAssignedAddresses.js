export const getDaoAssignedAddresses = ({ address }) => {
  return {
    url: `/dao/holder/${address}`,
    method: 'get',
  }
}

