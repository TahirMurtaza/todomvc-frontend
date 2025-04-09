import { Notify } from 'quasar'
import localStorageService from '@/services/localStorage.service'

export async function handleAuthRequest(store, requestFn, router) {
  try {
    const response = await requestFn()

    if (!response?.success) {
      Notify.create({
        message: response?.message || 'Something went wrong',
        color: 'negative',
      })
      return false
    }

    const { person, access_token, expiry } = response

    store.user = person
    store.accessToken = access_token
    store.accessTokenExpiry = expiry

    localStorageService.setItem('user', person)
    localStorageService.setItem('accessToken', access_token)
    localStorageService.setItem('accessTokenExpiry', expiry)

    router.push('/dashboard')

    return true
  } catch (error) {
    Notify.create({
      message: error.response?.data?.message || 'An unknown error occurred',
      color: 'negative',
    })
    return false
  }
}