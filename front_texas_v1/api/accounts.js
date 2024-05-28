import request from './config'

export const updateMainUser = data => {
  return request({
    url: '/auth/accounts/profile/',
    method: 'PUT',
    data
  })
}

export const changePassword = data => {
  return request({
    url: '/auth/accounts/change_password/',
    method: 'POST',
    data
  })
}
