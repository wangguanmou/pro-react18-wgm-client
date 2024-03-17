import type { FC, PropsWithChildren } from 'react'
import styles from './css/auth-layout.module.less'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/redux/hooks'
import { selectToken } from '@/redux/slice/user'

const AuthLayout: FC<PropsWithChildren<{ height?: number }>> = ({ height = 350, children }) => {
  const token = useAppSelector(selectToken)

  if (token) return <Navigate to="/" replace />

  return (
    <div className={styles.container}>
      <div className={styles.box} style={{ height }}>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
