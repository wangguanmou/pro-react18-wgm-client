import type { FC } from 'react'
import { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout } from 'antd'
import styles from './header.module.less'
import RootBreadcrumb from '@/root/breadcrumb/breadcrumb'
import RootOpts from '@/root/options/options'

const { Header } = Layout
const RootHeader: FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Header className={styles.header}>
      <div className={styles.left}>
        <Button
          className={styles.btn}
          type="text"
          icon={
            collapsed ? (
              <MenuUnfoldOutlined
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            ) : (
              <MenuFoldOutlined
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            )
          }
          onClick={() => setCollapsed(!collapsed)}
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
