import type { FC } from 'react'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Menu, Layout } from 'antd'
import styles from './nav.module.less'
import logo from '@/assets/images/react.svg'
import { useAppSelector } from '@/redux/hooks'
import { selectCollapsed } from '@/redux/slice/system'

const { Sider } = Layout

const RootNav: FC = () => {
  const collapsed = useAppSelector(selectCollapsed)

  return (
    <Sider className={styles.nav} collapsible collapsed={collapsed}>
      <div className={styles.logoBox}>
        <img className={styles.logoImg} src={logo} alt="logo" />
        {!collapsed && <span className={styles.logoText}>React管理系统</span>}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: 'nav 1',
          },
          {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'nav 2',
          },
          {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
          },
        ]}
      />{' '}
    </Sider>
  )
}

export default RootNav
