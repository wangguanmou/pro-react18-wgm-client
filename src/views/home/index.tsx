import type { FC } from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const Home: FC = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Button onClick={() => navigate('/user-info')}>BTN</Button>
    </div>
  )
}

export default Home
