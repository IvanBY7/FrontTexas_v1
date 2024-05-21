import request from './config'

export const createarea = data => {
  return request({
    url: '/area/create-area/',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const getareabysucursal = data => {
  return request({
    url: '/area/get-area-by-sucursal/?IdSucursal=' + data,
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const deletarea = data => {
  return request({
    url: '/region/delete-region/?IdRegion=' + data,
    method: 'POST'
  })
}
