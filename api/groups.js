import request from './config'

export const getGroups = params => {
  return request({
    url: '/groups/',
    method: 'GET',
    params
  })
}
