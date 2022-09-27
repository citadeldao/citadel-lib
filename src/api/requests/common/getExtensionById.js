// function returns request parameters for the axios instance.
export const getExtensionById = ({ id }) => ({
  // backend domain is in the axios instance
  url: `/profile/extension/${id}`,
  method: 'get',
})
