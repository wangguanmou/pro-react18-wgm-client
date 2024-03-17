/// <reference types="vite/client" />

// https://www.cnblogs.com/echoyya/p/17249642.html
// 有时处理类型之后，对象类型结构不明显。只是简单做一个映射，并未其他意义。
type Compute<T extends object> = {
  [K in keyof T]: T[K] // 映射
}

type PartialPropsOption<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>
