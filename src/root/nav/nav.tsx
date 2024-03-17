import type { FC } from 'react'
import { Menu, Layout } from 'antd'
import type { MenuProps } from 'antd'
import styles from './nav.module.less'
import logo from '@/assets/images/react.svg'
import { useAppSelector } from '@/redux/hooks'
import { selectCollapsed } from '@/redux/slice/system'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { getMenuItems, getDefaultOpenKeys, getBreadcrumb } from '@/utils/tools'
import { routes } from '@/router/routes'
import { IMenuItem, Role } from '@/types/permission'
import { useAppDispatch } from '@/redux/hooks'
import { setBreadcrumb } from '@/redux/slice/permission'

const { Sider } = Layout

const RootNav: FC = () => {
  const collapsed = useAppSelector(selectCollapsed)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const role: Role = 'normal'
  const items = useMemo(
    () => getMenuItems(JSON.parse(JSON.stringify(routes)) as IMenuItem[], role),
    [routes, role],
  )
  const defaultOpenKeys = useMemo(() => getDefaultOpenKeys(items, pathname), [items, pathname])
  const breadcrumb = useMemo(() => getBreadcrumb(items, pathname), [items, pathname])
  console.log('--', items, defaultOpenKeys, breadcrumb)
  const dispatch = useAppDispatch()
  dispatch(setBreadcrumb(breadcrumb))

  const onClick: MenuProps['onClick'] = ({ key }) => {
    // console.log(key, keyPath, domEvent)
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
        defaultOpenKeys={defaultOpenKeys}
        defaultSelectedKeys={[pathname]}
        items={items}
        onClick={onClick}
      />
    </Sider>
  )
}

export default RootNav
