import React from 'react'
import { Button, Result, Image } from 'antd'
import { useNavigate } from 'react-router-dom'
import img403 from '@/assets/images/403.svg'

const Error403: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Result
      icon={<Image preview={false} height={260} src={img403} />}
      // status="403" // 禁用后 icon 生效
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          Back Home
        </Button>
      }
    />
  )
}

export default Error403
