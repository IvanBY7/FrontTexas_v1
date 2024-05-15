import request from './config'

export const createcompany = data => {
  return request({
    url: '/empresa/create-company/',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const getUserCompany = data => {
  console.log(data)
  return request({
    url: '/empresa/user-companies/?email=' + data,
    method: 'GET'
  })
}
