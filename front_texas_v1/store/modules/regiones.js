import { createregion, getcompanyRegions, deletRegions } from '~/api/region'

export const actions = {
  async createRegion ({ commit }, query) {
    const res = await createregion(query)
    return res
  },
  async getRegion ({ commit }, query) {
    const res = await getcompanyRegions(query)
    return res
  },
  async delRegion ({ commit }, query) {
    const res = await deletRegions(query)
    return res
  }
}
