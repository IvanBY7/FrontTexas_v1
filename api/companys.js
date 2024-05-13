import request from './config'

export const createcompany = data => {
  return request({
    url: '/empresa/create-company/',
    method: 'POST',
    data
  })
}
