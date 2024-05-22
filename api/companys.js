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
  return request({
    url: '/empresa/user-companies/?email=' + data,
    method: 'GET'
  })
}
export const deletCompany = data => {
  return request({
    url: '/empresa/delete-company-by-name/?IdEmpresa=' + data,
    method: 'POST'
  })
}
export const getsensorsbyCompany = data => {
  return request({
    url: `http://localhost:8000/api/v1/registers/get_sensors_by_company/${data}/`,
    method: 'GET'
  })
}
