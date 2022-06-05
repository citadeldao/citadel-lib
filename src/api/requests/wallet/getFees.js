export const getFees = ({ net }) => ({
  url: `/currency/${net}/fees`,
  method: 'get',
})
