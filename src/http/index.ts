import request from './request'

import { useAppStoreWithOut } from '@/store/modules/app'

import config from './config'

import { AxiosPromise } from 'axios'

const { default_headers } = config
const appStore = useAppStoreWithOut()

function fetch({
  url,
  method,
  params,
  data,
  headersType,
  responseType
}: FetchConfig): AxiosPromise {
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
