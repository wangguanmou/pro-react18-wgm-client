import type { RouteObject, ActionFunctionArgs, LoaderFunctionArgs } from 'react-router-dom'
import type { MenuProps } from 'antd'

type Role = 'admin' | 'manage' | 'normal'
type Roles = Role[]
type PermissionCode = 'permission@get' | 'permission@add' | 'permission@put' | 'permission@del'
type RootCode = PermissionCode

interface IPermissionBtn {
  code: RootCode
  roles?: Roles
}

export interface IMenuItem {
  readonly key: string
  readonly path: string
  title?: string
  label?: string
  icon?: JSX.Element | string
  element?: JSX.Element | string
  readonly lazy?: () => Promise<{
    Component: React.FC
    loader?: (params: LoaderFunctionArgs) => Omit<any, 'undefined'>
    action?: (params: ActionFunctionArgs) => Omit<any, 'undefined'>
  }>
  children?: IMenuItem[]
  roles?: Roles
  type?: 1 | 2 | 3 //1菜单 2页面 3按钮
  hidden?: boolean
  disabled?: boolean
  buttons?: IPermissionBtn[]
  [key: string]: any
}

type MenuItem = Required<MenuProps>['items'][number]

export type Routes = PartialPropsOption<IMenuItem, 'key' | 'path'>[] & RouteObject[]
