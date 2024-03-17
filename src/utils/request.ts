import axios from 'axios'
import type {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestTransformer,
  AxiosResponse,
  AxiosError,
  CustomParamsSerializer,
} from 'axios'
import qs from 'qs'
import { message } from 'antd'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { selectToken, resetUser } from '@/redux/slice/user'

class Request {
  instance: AxiosInstance

  constructor(config: CreateAxiosDefaults<any>) {
    this.instance = axios.create(config)

    const requestTransformer: AxiosRequestTransformer = (data: unknown) =>
      data instanceof FormData ? qs.stringify(Object.fromEntries(data)) : qs.stringify(data)

    // 添加请求拦截器
    this.instance.interceptors.request.use(
      function (config) {
        const url = config.url
        // const method = config.method?.toUpperCase()
        const token = useAppSelector(selectToken)

        // data 过滤
        config.transformRequest = requestTransformer // data 过虑

        // params 过滤
        config.paramsSerializer = {
          serialize: requestTransformer as CustomParamsSerializer,
        }

        // 只有 /my 开头的接口需要 token, /api 开头的接口不需要 token
        if (url?.includes('/my') && token) config.headers.Authorization = token

        return config
      },
      function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
      },
    )

    // 添加响应拦截器
    this.instance.interceptors.response.use(
      function (response: AxiosResponse) {
        // 有响应体 response.data
        if (response.data) return response.data
        // 无响应体, 自定义一个
        return { code: 0, message: response.statusText }
      },
      function (error: AxiosError<BaseResponse>) {
        // 有响应体 error.response
        console.log('error---', error)
        const dispatch = useAppDispatch()
        if (error.response && error.response.data) {
          // 如果 token 失效
          if (error.response.status === 401) {
            // 会弹出2次提示, 因为有2次请求( getUserinfo 一次, getToken 一次 )
            useAppSelector(selectToken) &&
              message.error(error.response.data?.message || 'token 失效, 请重新登录')
            dispatch(resetUser())
            // 不用再跳转至登录页, 因为已经封装了 AuthRoot 组件, 在那里有跳转代码
          } else {
            message.error(error.response.data.message)
          }
          return Promise.reject(error.response.data)
        }
        // 无响应体
        let msg = ''
        switch (error.code) {
          case 'ERR_NETWORK':
            msg = '断网了...'
            break
          case 'ECONNABORTED':
          case 'ETIMEDOUT':
            msg = '请求超时!'
            break
          default:
            msg = error.message
            break
        }
        message.error(msg)
        return Promise.reject({ code: 1, message: error.message }) // 无响应体, 自定义一个
      },
    )

    // return this.instance
    // https://stackoverflow.com/questions/78157343/how-to-define-typescript-types-about-axios-packaging
  }
}

export const requestApi = new Request({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
}).instance

export const request = new Request({
  baseURL: 'http://localhost:3000/my',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
}).instance
