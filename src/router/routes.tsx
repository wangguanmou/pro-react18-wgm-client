import type { Routes } from '@/types/permission'
import Root from '@/root/root'
import Home from '@/views/home'
import ErrorPage from '@/views/error/error-page'

export const routes: Routes = [
  // 登录
  {
    path: '/login',
    async lazy() {
      const { default: Component } = await import('@/views/auth/login')
      return {
        Component,
      }
    },
    // 非路由配置
    hidden: true,
  },
  // 注册
  {
    path: '/registry',
    async lazy() {
      const { default: Component } = await import('@/views/auth/registry')
      return {
        Component,
      }
    },
    // 非路由配置
    hidden: true,
  },
  // 首页
  {
    path: '/',
    element: <Root />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Home />,
            // 非路由配置
            hidden: true,
          },
          {
            path: '/home',
            element: <Home />,
            // 非路由配置
            label: '首页',
            icon: 'HomeOutlined',
          },
        ],
      },
    ],
  },
  // 用户管理
  {
    path: '/',
    element: <Root />,
    // 非路由配置
    label: '用户管理',
    icon: 'TeamOutlined',
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/user-info',
            async lazy() {
              const { default: Component } = await import('@/views/users/user-info')
              return {
                Component,
              }
            },
            // 非路由配置
            label: '用户信息',
            icon: 'UserOutlined',
          },
          {
            path: '/user-permission',
            async lazy() {
              const { default: Component } = await import('@/views/users/user-permission')
              return {
                Component,
              }
            },
            // 非路由配置
            label: '用户权限',
            icon: 'ApartmentOutlined',
            roles: ['admin', 'manage'],
            buttons: [
              { code: 'permission@add', roles: ['admin', 'manage'] },
              { code: 'permission@get', roles: ['admin', 'manage'] },
              { code: 'permission@put', roles: ['admin', 'manage'] },
              { code: 'permission@del', roles: ['admin'] },
            ],
          },
        ],
      },
    ],
  },
  // 地图展示
  {
    path: '/',
    element: <Root />,
    label: '地图展示',
    icon: 'MediumOutlined',
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/b-map',
            label: '百度地图',
            icon: 'BaiduOutlined',
            async lazy() {
              const { default: Component } = await import('@/views/map/b-map')
              return {
                Component,
              }
            },
          },
          {
            path: '/a-map',
            label: '高德地图',
            icon: 'AlibabaOutlined',
            async lazy() {
              const { default: Component } = await import('@/views/map/a-map')
              return {
                Component,
              }
            },
          },
        ],
      },
    ],
  },
  // error-page
  {
    path: '/',
    element: <Root />,
    hidden: true,
    children: [
      {
        path: '/403',
        async lazy() {
          const { default: Component } = await import('@/views/error/error-403')
          return {
            Component,
          }
        },
      },
      {
        path: '/404',
        async lazy() {
          const { default: Component } = await import('@/views/error/error-404')
          return {
            Component,
          }
        },
      },
    ],
  },
]
