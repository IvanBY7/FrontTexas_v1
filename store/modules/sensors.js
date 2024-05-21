import { getDispositivos, getSensores, getRegistros, getRegistrosbyrango } from '~/api/sensors'

export const actions = {
  async getDispositivos ({ commit }, query) {
    const res = await getDispositivos(query)
    return res
  },
  async getSensors ({ commit }, id) {
    const res = await getSensores(id)
    return res
  },
  async getRegistersbySensor ({ commit }, id) {
    const res = await getRegistros(id)
    return res
  },
  async getRegistersbySensorbyRango ({ commit }, data) {
    const res = await getRegistrosbyrango(data)
    return res
  }
}
