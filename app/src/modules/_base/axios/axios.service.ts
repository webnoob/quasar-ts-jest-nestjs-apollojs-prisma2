import { injectable } from 'inversify-props'
import axiosInstance, { AxiosInstance } from 'axios'

import AxiosServiceInterface from './axios.service.interface'
import StoreService from '../store.service'
import { injectSingleton } from '../../diContainer'
import { AUTH_REQUIRED } from '../../../store/actions/auth'

@injectable()
class AxiosService implements AxiosServiceInterface {
  public readonly axios: AxiosInstance

  public constructor (
    @injectSingleton(StoreService) storeService: StoreService
  ) {
    this.axios = axiosInstance.create({
      baseURL: process.env.DEV ? 'http://localhost:3000/' : 'http://TODO.at.somepoint',
      timeout: 10000
    })

    this.axios.interceptors.request.use(
      config => {
        config.headers["Authorization"] = "bearer " + storeService.store.getters.authToken
        return config
      },
      error => {
        Promise.reject(error)
      }
    )

    this.axios.interceptors.response.use(response => {
      return response
    }, error => {
      console.log('Axios Error: ', error)
      storeService.store.dispatch(AUTH_REQUIRED)
      throw {
        ...error.response.data
      }
    })
  }
}

export default AxiosService
