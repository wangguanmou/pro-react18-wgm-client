import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'
import { Breadcrumb } from 'antd'

const RootBreadcrumb: React.FC = () => (
  <Breadcrumb
    separator=">"
    items={[
      {
        href: '',
        title: <HomeOutlined />,
      },
      {
        href: '',
        title: (
          <>
            <UserOutlined />
            <span>Application List</span>
          </>
        ),
      },
      {
        title: 'Application',
      },
    ]}
  />
)

export default RootBreadcrumb
