import request from './request'

import { useAppStore } from '@/store/modules/app'

import config from './config'

import { AxiosPromise, ResponseType } from 'axios'

const { default_headers } = config
const appStore = useAppStore()

export interface Config {
  params?: any
  data?: any
  url?: string
  method?: 'get' | 'post' | 'delete' | 'put'
  headersType?: string
  responseType?: ResponseType
}

function fetch({ url, method, params, data, headersType, responseType }: Config): AxiosPromise {
  return request({
    url: url,
    method,
    params: appStore.requestTime ? { time: new Date().getTime(), ...(params || {}) } : params,
    data,
    responseType: responseType,
    headers: {
      'Content-Type': headersType || default_headers
    }
  })
}

export default fetch
