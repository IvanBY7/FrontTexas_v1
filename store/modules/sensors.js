import { getRegisters, getDispositivos, getSensores, getRegistros } from '~/api/sensors'

export const actions = {
  async getRegisters ({ commit }, query) {
    const res = await getRegisters(query)
    return res
  },
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
  }
}
