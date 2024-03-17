import type { FC } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space, message } from 'antd'
import { Link, useFetcher, useSearchParams } from 'react-router-dom'
import type { ActionFunctionArgs } from 'react-router-dom'
import to from 'await-to-js'
import { useAppDispatch } from '@/redux/hooks'
import { setToken } from '@/redux/slice/user'
import { login } from '@/api'
import AuthLayout from './auth-layout'
import styles from './css/auth-layout.module.less'

const Login: FC = () => {
  const loginFetcher = useFetcher()
  let [searchParams] = useSearchParams()
  // console.log('login---', loginFetcher, searchParams)

  const onFinish = async (values: FormReg) => {
    // console.log('Received values of form: ', values)
    loginFetcher.submit(values, {
      method: 'post',
      // action: '/login',
    })
  }

  return (
    <AuthLayout height={320}>
      <Form
        size="large"
        onFinish={onFinish}
        initialValues={{ username: searchParams.get('username') || 'admin', password: '123456' }}
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: 'Please input your Username!' },
            { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '1-10位的字母或数字!' },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please input your Password!' },
            { pattern: /^\S{6,15}$/, message: '6-15位的非空字符串!' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Space direction="vertical">
            <Button
              type="primary"
              htmlType="submit"
              loading={loginFetcher.state !== 'idle' && { delay: 200 }}
              disabled={loginFetcher.state !== 'idle'}
            >
              Log in
            </Button>
            <div>
              <Link className={styles.link} to="/registry">
                Register now!
              </Link>
            </div>
          </Space>
        </Form.Item>
      </Form>
    </AuthLayout>
  )
}

// todo router 的 loader/action 里用不了 hooks!
export const action = async ({ request }: ActionFunctionArgs) => {
  let formData = await request.formData()
  const dispatch = useAppDispatch()
  const [err, res] = await to(login(formData))
  if (err) return null
  dispatch(setToken(res.data!))
  message.success(res.message)
  return null
}

export default Login
