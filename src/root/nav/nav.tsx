import type { FC } from 'react'
import { useMemo, useState, useEffect } from 'react'
import { Menu, Layout } from 'antd'
import type { MenuProps } from 'antd'
import styles from './nav.module.less'
import logo from '@/assets/images/react.svg'
import { selectCollapsed } from '@/redux/slice/system'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/redux/hooks'
import { IMenuItem } from '@/types/permission'
import { getOpenKeys } from '@/utils/tools'

const { Sider } = Layout

const RootNav: FC<{ items: IMenuItem[] }> = ({ items }) => {
  const collapsed = useAppSelector(selectCollapsed)
  const navigate = useNavigate()
  let { pathname } = useLocation()
  pathname = pathname === '/' ? '/home' : pathname
  const defaultOpenKeys = useMemo(() => getOpenKeys(items, pathname), [items, pathname])
  const [openKeys, setOpenkeys] = useState(defaultOpenKeys)

  useEffect(() => {
    setOpenkeys(getOpenKeys(items, pathname))
  }, [pathname])

  const onOpenChange = (openKeys: string[]) => {
    setOpenkeys(openKeys)
  }

  const onClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }

  return (
    <Sider className={styles.nav} trigger={null} collapsible collapsed={collapsed}>
      <div className={styles.logoBox}>
        <img className={styles.logoImg} src={logo} alt="logo" />
        {!collapsed && <span className={styles.logoText}>React管理系统</span>}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        // defaultOpenKeys={defaultOpenKeys}
        defaultSelectedKeys={[pathname]}
        openKeys={openKeys}
        selectedKeys={[pathname]}
        items={items}
        onClick={onClick}
        onOpenChange={onOpenChange}
      />
    </Sider>
  )
}

export default RootNav
