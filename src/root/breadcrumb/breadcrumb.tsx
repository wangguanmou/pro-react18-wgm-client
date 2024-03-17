import React from 'react'
import { Breadcrumb } from 'antd'
import { useAppSelector } from '@/redux/hooks'
import { selectBreadcrumb } from '@/redux/slice/permission'

const RootBreadcrumb: React.FC = () => {
  const breadcrumb = useAppSelector(selectBreadcrumb)

  return <Breadcrumb separator=">" items={breadcrumb} />
}

export default RootBreadcrumb
