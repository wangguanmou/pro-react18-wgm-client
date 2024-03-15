import { createBrowserRouter } from 'react-router-dom'
import Root from '@/root/root'
import Home from '@/views/home'

const router = createBrowserRouter([
  {
    path: '/login',
    async lazy() {
      const { default: Component } = await import('@/views/login')
      return {
        Component,
      }
    },
  },
  {
    path: '/registry',
    async lazy() {
      const { default: Component } = await import('@/views/registry')
      return {
        Component,
      }
    },
  },
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/home',
        element: <Home />,
      },
    ],
  },
])

export default router
