// src/services/notify.service.js
import { Notify } from 'quasar'

class NotifyService {
  success(message) {
    Notify.create({
      type: 'positive',
      message,
      position: 'top-right',
      timeout: 3000,
    })
  }

  error(message = 'Something went wrong') {
    Notify.create({
      type: 'negative',
      message,
      position: 'top-right',
      timeout: 3000,
    })
  }
}

export default new NotifyService()