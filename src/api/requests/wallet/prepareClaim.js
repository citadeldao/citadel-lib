export const prepareClaim = (data) => {
  return {
    url: `/transactions/${data.net}/${data.address}/prepare-claim-reward?version=1.0.5`,
    method: 'post',
  }
}
