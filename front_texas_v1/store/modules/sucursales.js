import { createsucursal, getsucursalbyregion, deletsucursal } from '~/api/sucursal'

export const actions = {
  async createSucursal ({ commit }, query) {
    const res = await createsucursal(query)
    return res
  },
  async getSucursal ({ commit }, query) {
    const res = await getsucursalbyregion(query)
    return res
  },
  async delRegion ({ commit }, query) {
    const res = await deletsucursal(query)
    return res
  }
}
