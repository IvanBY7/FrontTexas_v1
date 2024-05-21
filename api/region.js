import request from './config'

export const createregion = data => {
  return request({
    url: '/region/create-region/',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const getcompanyRegions = data => {
  return request({
    url: '/region/get-regions-by-company/?IdEmpresa=' + data,
    method: 'GET'
  })
}
export const deletRegions = data => {
  return request({
    url: '/region/delete-region/?IdRegion=' + data,
    method: 'POST'
  })
}
