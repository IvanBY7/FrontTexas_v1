import request from './config'

export const updateUser = (id, data) => {
  return request({
    url: '/users/' + id + '/',
    method: 'PUT',
    data
  })
}

export const getUsers = params => {
  return request({
    url: '/users/',
    method: 'GET',
    params
  })
}

export const getUserbyCompany = data => {
  return request({
    url: '/users/get-user-by-company/',
    method: 'POST',
    data
  })
}

export const createUser = data => {
  return request({
    url: '/users/create-user/',
    method: 'POST',
    data: {
      ...data,
      is_active: false
    },
    public: true
  })
}
