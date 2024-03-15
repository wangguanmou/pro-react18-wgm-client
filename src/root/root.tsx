import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import styles from './root.module.less'
import RootHeader from './header/header'
import RootNav from './nav/nav'
import RootTabs from './tab/tab'

const { Content } = Layout

const Root: React.FC = () => {
  return (
    <Layout>
      <RootNav />
      <Layout>
        <RootHeader />
        <RootTabs />
        <main className={styles.main}>
          <Content className={styles.content}>
            <Outlet />
          </Content>
        </main>
      </Layout>
    </Layout>
  )
}

export default Root
