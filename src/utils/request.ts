import type { FC, PropsWithChildren } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import type {
  AxiosInstance,
  CreateAxiosDefaults,
  AxiosRequestTransformer,
  AxiosResponse,
  AxiosError,
  CustomParamsSerializer,
  InternalAxiosRequestConfig,
} from 'axios'
import qs from 'qs'
import { message } from 'antd'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { selectToken, resetUser } from '@/redux/slice/user'

const requestTransformer: AxiosRequestTransformer = (data: unknown) => {
  return data instanceof FormData ? qs.stringify(Object.fromEntries(data)) : qs.stringify(data)
}

class Request {
  instance: AxiosInstance

  constructor(config: CreateAxiosDefaults<any>) {
    this.instance = axios.create(config)
  }
}

export const requestApi = new Request({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
}).instance

export const request = new Request({
  baseURL: '/my',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
}).instance

/**
 * https://dev.to/arianhamdi/react-hooks-in-axios-interceptors-3e1h
 * Adding an interceptor in a component is a side effect, so we get help from useEffect hook.
 * Add the interceptors to the Axios instance in the useEffect.
 * Note : you must remove interceptors in useEffect return statement, because every execution of useEffect, adds a new interceptor to Axios instance.
 */
export const AxiosInterceptor: FC<PropsWithChildren> = ({ children }) => {
  const token = useAppSelector(selectToken)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const interceptorRequestSuccess = function (config: InternalAxiosRequestConfig<any>) {
      const url = config.url

      // data 过滤
      config.transformRequest = requestTransformer // data 过虑

      // params 过滤
      config.paramsSerializer = {
        serialize: requestTransformer as CustomParamsSerializer,
      }

      // 只有 /my 开头的接口需要 token, /api 开头的接口不需要 token
      if (url?.includes('/my') && token) config.headers['Authorization'] = token

      return config
    }
    const interceptorRequestFail = function (error: any) {
      // 对请求错误做些什么
      return Promise.reject(error)
    }
    const interceptorResponseSuccess = (response: AxiosResponse) => {
      // 有响应体 response.data
      if (response.data) return response.data
      // 无响应体, 自定义一个
      return { code: 0, message: response.statusText }
    }
    const interceptorResponseFail = (error: AxiosError<BaseResponse>) => {
      // 有响应体 error.response
      console.log('error---', error)
      if (error.response && error.response.data) {
        // 如果 token 失效
        if (error.response.status === 401) {
          // 会弹出2次提示, 因为有2次请求( getUserinfo 一次, getToken 一次 )
          token && message.error(error.response.data?.message || 'token 失效, 请重新登录')
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
          msg = '网络有问题...'
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
    }

    const interceptorReqByApi = requestApi.interceptors.request.use(
      interceptorRequestSuccess,
      interceptorRequestFail,
    )
    const interceptorResByApi = requestApi.interceptors.response.use(
      interceptorResponseSuccess,
      interceptorResponseFail,
    )
    const interceptorReq = request.interceptors.request.use(
      interceptorRequestSuccess,
      interceptorRequestFail,
    )
    const interceptorRes = request.interceptors.response.use(
      interceptorResponseSuccess,
      interceptorResponseFail,
    )

    return () => {
      requestApi.interceptors.request.eject(interceptorReqByApi)
      requestApi.interceptors.response.eject(interceptorResByApi)
      request.interceptors.request.eject(interceptorReq)
      request.interceptors.response.eject(interceptorRes)
    }
  }, [token])

  return children
}
