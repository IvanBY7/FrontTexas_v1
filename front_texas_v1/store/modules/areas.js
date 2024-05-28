import { getareabysucursal, createarea, deletarea } from '~/api/area_trabajo'

export const actions = {
  async createArea ({ commit }, query) {
    const res = await createarea(query)
    return res
  },
  async getArea ({ commit }, query) {
    const res = await getareabysucursal(query)
    return res
  },
  async delRegion ({ commit }, query) {
    const res = await deletarea(query)
    return res
  }
}
