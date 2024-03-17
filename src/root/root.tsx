import { Layout } from 'antd'
import { useMemo } from 'react'
import { Outlet, redirect, useLocation, useLoaderData } from 'react-router-dom'
import type { LoaderFunctionArgs } from 'react-router-dom'
import { getMenuItems, getBreadcrumb, getWhiteList, getAllPathnameList } from '@/utils/tools'
import { routes } from '@/router/routes'
import { IMenuItem, Role } from '@/types/permission'
import styles from './root.module.less'
import RootHeader from './header/header'
import RootNav from './nav/nav'
import RootTabs from './tab/tab'

const { Content } = Layout

const Root: React.FC = () => {
  const { pathname } = useLocation()
  const { role } = useLoaderData() as any
  const items = useMemo(
    () => getMenuItems(JSON.parse(JSON.stringify(routes)) as IMenuItem[], role),
    [routes, role],
  )

  const breadcrumb = useMemo(() => getBreadcrumb(items, pathname), [items, pathname])
  // console.log('大权限树 -> items:', items)

  return (
    <Layout>
      <RootNav items={items} />
      <Layout>
        <RootHeader breadcrumb={breadcrumb} />
        <RootTabs />
        <main className={styles.main}>
          <Content className={styles.content}>
            <Outlet />
          </Content>
        </main>
      </Layout>
    </Layout>
  )
}

export default Root

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const pathname = new URL(request.url).pathname
  const role: Role = 'normal' // api getUsrInfo
  const allPathnameList = getAllPathnameList(routes as IMenuItem[])
  const whitelist = getWhiteList(routes as IMenuItem[], role)
  // console.log('loaderRoot---', whitelist, allPathnameList)
  if (!allPathnameList.has(pathname)) return redirect('/404')
  if (!whitelist.has(pathname)) return redirect('/403')
  return { role }
}
