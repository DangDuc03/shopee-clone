import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import type { AuthResponse } from 'src/types/auth.type'
import { getAccessTokenFromLS, removeLS, setAccessTokenToLS, setProfileToLS } from './auth'
import path from 'src/constants/path'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
    })
    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === path.login || url === path.register) {
          this.accessToken = (response.data as AuthResponse).data.access_token
          setAccessTokenToLS(this.accessToken)
          setProfileToLS((response.data as AuthResponse).data.user)
        } else if (url === path.logout) {
          this.accessToken = ''
          removeLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          removeLS()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
