import { request } from '@/utils/request'
/* 
  返回的 res 类型是在这里指定的
  在 axios 里指定响应拦截器中的 response: AxiosResponse 的泛型有问题
*/

// 获取用户基本信息
export const getUserInfo = () =>
  request<null, BaseResponse<User>>({
    method: 'get',
    url: '/my/userinfo',
  })

// 修改用户信息
export const updateUserInfo = (data: FormData) =>
  request<null, BaseResponse>({
    method: 'patch',
    url: '/my/userinfo',
    data,
  })

// 修改密码
export const updatePassword = (data: FormData) =>
  request<null, BaseResponse>({
    method: 'PATCH',
    url: '/my/updatepwd',
    data,
  })

// 更新头像
export const updateAvatar = (data: FormData) =>
  request<null, BaseResponse>({
    method: 'PATCH',
    url: '/my/update/avatar',
    data,
  })
