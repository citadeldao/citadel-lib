export const getCurrency = (data) => {
  return {
    url: `/currency/${data.net}`,
    method: 'get',
  }
}