import fetch from '@/http'

export const loginApi = ({ data }: any) => {
  return fetch({ url: '/user/login', method: 'post', data })
}

export const getRoleDetApi = ({ params }: any) => {
  return fetch({ url: '/role/detail', method: 'get', params })
}
