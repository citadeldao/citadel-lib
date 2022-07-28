// function returns request parameters for the axios instance.
export const getSubscriptions = () => ({
    url: `/email/subscriptions`,
    method: 'get',
  })