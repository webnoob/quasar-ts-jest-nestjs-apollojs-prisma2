import { injectable } from 'inversify-props'
import IAxiosService from './axios.service.interface'
import axiosInstance, { AxiosInstance, AxiosRequestConfig } from 'axios'

@injectable()
class AxiosService implements IAxiosService {
  public readonly axios: AxiosInstance

  public constructor () {
    this.axios = axiosInstance.create({
      baseURL: process.env.DEV ? 'http://localhost:3000/' : 'http://TODO.at.somepoint',
      timeout: 10000
    })
  }
}

export default AxiosService
