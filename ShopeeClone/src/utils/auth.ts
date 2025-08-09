import type { User } from 'src/types/user.type'

export const localStorageeEventTarget = new EventTarget()

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessTokenFromLS = (): string => {
  return localStorage.getItem('access_token') || ''
}

export const removeLS = (): void => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
  localStorageeEventTarget.dispatchEvent(new Event('clearLS')) // Dispatch an event to notify other parts of the app
}

export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfileFromLS = () => {
  const profile = localStorage.getItem('profile')
  return profile ? JSON.parse(profile) : null
}
