import request from './config'

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
export const getRegistrosbyrango = (data) => {
  console.log(data.rango)
  return request({
    url: `/registers/get-register_short/${data.id}/${data.rango}/`,
    method: 'GET'
  })
}
