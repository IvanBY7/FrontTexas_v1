import { createcompany } from '~/api/companys'

export const actions = {
  async createCompany ({ commit }, query) {
    const res = await createcompany(query)
    return res
  }
}
