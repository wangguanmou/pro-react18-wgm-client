import { requestApi } from '@/utils/request'
/* 
  返回的 res 类型是在这里指定的
  在 axios 里指定响应拦截器中的 response: AxiosResponse 的泛型有问题
*/

export const registry = (data: FormData) =>
  requestApi<null, BaseResponse>({
    method: 'post',
    url: '/api/registry',
    data,
  })

export const login = (data: FormData) =>
  requestApi<null, BaseResponse<string>>({
    method: 'post',
    url: '/api/login',
    data,
  })
