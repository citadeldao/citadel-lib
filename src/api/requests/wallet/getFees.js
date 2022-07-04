// function returns request parameters for the axios instance.
export const getFees = ({ net }) => ({
  // backend domain is in the axios instance
  url: `/currency/${net}/fees`,
  method: 'get',
})
