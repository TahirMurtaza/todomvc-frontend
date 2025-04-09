import { BaseService } from './base.service'

class PersonService extends BaseService {
  constructor() {
    super()
    this.baseUrl = '/person'
  }

  async getMe() {
    const { person } = await this.get(`${this.baseUrl}/me`)
    return person
  }

  async updateName(firstName, lastName) {
    const { person } = await this.patch(
      `${this.baseUrl}/me`,
      {
        first_name: firstName,
        last_name: lastName,
      },
      'Profile updated successfully.'
    )
    return person
  }
}

export default new PersonService()