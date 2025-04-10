import axios from '@/config/axios'
import NotifyService from './notify.service'

export class BaseService {
  async request(method, url, data = null, successMessage = null) {
    try {
      const config = {
        method,
        url,
        data,
      }

      const response = await axios(config)

      if (successMessage) {
        NotifyService.success(successMessage)
      }

      return response.data
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'An unexpected error occurred.'

      NotifyService.error(message)
      throw new Error(message)
    }
  }

  get(url, successMessage = null) {
    return this.request('get', url, null, successMessage)
  }

  post(url, data, successMessage = null) {
    return this.request('post', url, data, successMessage)
  }

  patch(url, data, successMessage = null) {
    return this.request('patch', url, data, successMessage)
  }

  put(url, data, successMessage = null) {
    return this.request('put', url, data, successMessage)
  }

  delete(url, successMessage = null) {
    return this.request('delete', url, null, successMessage)
  }
}