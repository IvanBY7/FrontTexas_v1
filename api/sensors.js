import request from './config'

export const getRegisters = params => {
  return request({
    url: '/groups/',
    method: 'GET',
    params
  })
}
export const getDispositivos = params => {
  return request({
    url: '/dispositivos/',
    method: 'GET',
    params
  })
}
export const getSensores = (id) => {
  return request({
    url: `/sensors/get-sensors/${id}/`,
    method: 'GET'
  })
}
export const getRegistros = (id) => {
  return request({
    url: `/registers/get-register/${id}/`,
    method: 'GET'
  })
}
