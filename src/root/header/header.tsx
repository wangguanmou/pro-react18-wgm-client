import type { FC } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout } from 'antd'
import styles from './header.module.less'
import RootBreadcrumb from '@/root/breadcrumb/breadcrumb'
import RootOpts from '@/root/options/options'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { switchCollapsed, selectCollapsed } from '@/redux/slice/system'

const { Header } = Layout
const RootHeader: FC = () => {
  const collapsed = useAppSelector(selectCollapsed)
  const dispatch = useAppDispatch()

  return (
    <Header className={styles.header}>
      <div className={styles.left}>
        <Button
          className={styles.btn}
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => dispatch(switchCollapsed(!collapsed))}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
        <RootBreadcrumb />
      </div>
      <RootOpts />
    </Header>
  )
}

export default RootHeader
