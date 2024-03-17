import React from 'react'
import { Breadcrumb } from 'antd'

const RootBreadcrumb: React.FC<{ breadcrumb: any[] }> = ({ breadcrumb }) => {
  return <Breadcrumb separator=">" items={breadcrumb} />
}

export default RootBreadcrumb
