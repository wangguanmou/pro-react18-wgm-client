import type { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import { ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import zhCN from 'antd/locale/zh_CN'
import { Provider } from 'react-redux'
import store, { persistor } from '@/redux/store'
import { PersistGate } from 'redux-persist/integration/react'

dayjs.locale('zh-cn')

const App: FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </ConfigProvider>
  )
}

export default App
