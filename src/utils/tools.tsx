import type { IMenuItem, Role } from '@/types/permission'
import React from 'react'
import * as AntdIcons from '@ant-design/icons'

export const str2AntdIcons = (name?: string | JSX.Element): JSX.Element => {
  if (!name) return <></>
  if (typeof name !== 'string') return name
  const reTypeAntdIcons: { [key: string]: any } = AntdIcons //类型被偷梁换柱成 { [key: string]: any }
  const icon = reTypeAntdIcons[name]
  if (!icon) return <></> //图标可能不存在
  return React.createElement(icon) //核心, 面试会问!
}

export const str2CodePoint = (str: string): string => {
  let s = ''
  for (const i in [...str.trim()]) {
    s += str.codePointAt(+i)
  }
  return s
}
/**
 *
 */
export const getMenuItems = (
  routes: IMenuItem[],
  role: Role,
  arr: IMenuItem[] = [],
): IMenuItem[] => {
  // debugger
  for (let route of routes) {
    if (route.hidden) continue //不显示菜单
    if (route.roles && !route.roles.includes(role)) continue //没权限
    if (route.index) continue //索引
    if (route.label) {
      if (Array.isArray(route.children)) {
        arr.push({
          ...route,
          key: route.path === '/' || !route.path ? `sub-${str2CodePoint(route.label)}` : route.path,
          title: route.label,
          icon: str2AntdIcons(route.icon),
          children: getMenuItems(route.children, role),
        })
      } else {
        arr.push({
          ...route,
          key: route.path === '/' || !route.path ? `sub-${str2CodePoint(route.label)}` : route.path,
          title: route.label,
          icon: str2AntdIcons(route.icon),
        })
      }
    } else {
      if (Array.isArray(route.children)) {
        arr.push(...getMenuItems(route.children, role))
      }
    }
  }
  return arr
}

export const getOpenKeys = (
  routes: IMenuItem[],
  pathname: string,
  result: string[] = [],
): string[] => {
  for (const route of routes) {
    if (route.key === pathname) {
      result.unshift(route.key)
      return result
    }
    if (route.children) {
      const res = getOpenKeys(route.children, pathname, result)
      if (res.length) {
        result.unshift(route.key)
        return result
      }
    }
  }
  return result
}

export const getBreadcrumb = (routes: IMenuItem[], pathname: string, result: any[] = []) => {
  for (const route of routes) {
    if (route.key === pathname) {
      result.unshift({
        title: (
          <>
            {route.icon}
            <span>{route.label}</span>
          </>
        ),
      })
      return result
    }
    if (route.children) {
      const res = getBreadcrumb(route.children, pathname, result)
      if (res.length) {
        result.unshift({
          title: (
            <>
              {route.icon}
              <span>{route.label}</span>
            </>
          ),
          menu: {
            items: route.children.map((item) => ({
              key: item.key,
              // 用 Link 报错
              label: (
                <a href={item.key}>
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ),
            })),
          },
        })
        return result
      }
    }
  }
  return result
}

export const getWhiteList = (
  routes: IMenuItem[],
  role: Role,
  set: Set<string> = new Set(),
): Set<string> => {
  for (const route of routes) {
    if (route.path && (!route.roles || route.roles.includes(role))) {
      set.add(route.path)
    }
    if (Array.isArray(route.children) && route.children.length) {
      getWhiteList(route.children, role, set)
    }
  }
  return set
}

export const getAllPathnameList = (
  routes: IMenuItem[],
  set: Set<string> = new Set(),
): Set<string> => {
  for (const route of routes) {
    route.path && set.add(route.path)
    if (Array.isArray(route.children) && route.children.length) {
      getAllPathnameList(route.children, set)
    }
  }
  return set
}
