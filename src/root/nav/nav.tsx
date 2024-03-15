import type { FC } from 'react'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Menu, Layout } from 'antd'
import styles from './nav.module.less'
import logo from '@/assets/images/react.svg'

const { Sider } = Layout

const RootNav: FC = () => {
  return (
    <Sider className={styles.nav} trigger={null} collapsible collapsed={false}>
      <div className={styles.logoBox}>
        <img className={styles.logoImg} src={logo} alt="logo" />
        <span>React管理系统</span>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: (
              <UserOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            ),
            label: 'nav 1',
          },
          {
            key: '2',
            icon: (
              <VideoCameraOutlined
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            ),
            label: 'nav 2',
          },
          {
            key: '3',
            icon: (
              <UploadOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            ),
            label: 'nav 3',
          },
        ]}
      />{' '}
    </Sider>
  )
}

export default RootNav
