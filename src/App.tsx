import type { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import { ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import zhCN from 'antd/locale/zh_CN'
// import styles from './index.module.css'

dayjs.locale('zh-cn')

const App: FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
