/// <reference types="vite/client" />

// https://www.cnblogs.com/echoyya/p/17249642.html
// 有时处理类型之后，对象类型结构不明显。只是简单做一个映射，并未其他意义。
type Compute<T extends object> = {
  [K in keyof T]: T[K] // 映射
}

type PartialPropsOption<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>

/* 表单提交类型 */
type FormReg = {
  username: string
  password: string
  repassword: string
}
type FormLogin = Omit<FormReg, 'repassword'>
type FormUserInfo = Pick<User, 'id' | 'nickname' | 'email'>

/* 返回体类型 */
interface BaseResponse<T = unknown> {
  code: 0 | 1
  message: string
  data?: T
}

// 用户信息类型
type User = {
  readonly id: number
  username: string
  nickname?: string
  email?: string
  avatar?: string
  username_gitee?: string
  rid: number
  role: string
  label: string
}
