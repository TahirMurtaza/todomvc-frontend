// src/services/auth.service.js
import { BaseService } from './base.service'

class AuthService extends BaseService {
  constructor() {
    super()
    this.baseUrl = '/auth'
  }

  async signup(payload) {
    return this.post(`${this.baseUrl}/signup`, payload)
  }

  async login(payload) {
    return this.post(`${this.baseUrl}/login`, payload)
  }

  async setPassword(token, uidb64, payload) {
    return this.post(`${this.baseUrl}/reset_password/${token}/${uidb64}`, payload)
  }
}

export default new AuthService()