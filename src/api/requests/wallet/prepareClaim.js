// function returns request parameters for the axios instance.
export const prepareClaim = (data) => {
  return {
    // backend domain is in the axios instance
  url: `/transactions/${data.net}/${data.address}/prepare-claim-reward?version=1.0.5`,
    method: 'post',
    data: {
      isTyped: data.isTyped
    },
  }
}
