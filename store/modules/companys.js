import { createcompany, getUserCompany } from '~/api/companys'

export const actions = {
  async createCompany ({ commit }, query) {
    const res = await createcompany(query)
    return res
  },
  async getCompany ({ commit }, query) {
    const res = await getUserCompany(query)
    return res
  }
}
