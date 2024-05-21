import { createcompany, getUserCompany, deletCompany } from '~/api/companys'

export const actions = {
  async createCompany ({ commit }, query) {
    const res = await createcompany(query)
    return res
  },
  async getCompany ({ commit }, query) {
    const res = await getUserCompany(query)
    return res
  },
  async delCompany ({ commit }, query) {
    const res = await deletCompany(query)
    return res
  }
}
