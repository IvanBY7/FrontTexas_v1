import request from './config'

export const createsucursal = data => {
  return request({
    url: '/sucursal/create-sucursal/',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const getsucursalbyregion = data => {
  return request({
    url: '/sucursal/by-region/?IdRegion=' + data,
    method: 'GET'
  })
}
export const deletsucursal = data => {
  return request({
    url: '/region/delete-region/?IdRegion=' + data,
    method: 'POST'
  })
}
