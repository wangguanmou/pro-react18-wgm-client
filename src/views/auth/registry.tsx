import type { FC } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space, message } from 'antd'
import { Link, redirect, useSubmit, useNavigation } from 'react-router-dom'
import type { ActionFunctionArgs } from 'react-router-dom'
import to from 'await-to-js'
import { registry } from '@/api'
import AuthLayout from './auth-layout'
import styles from './css/auth-layout.module.less'

const Registry: FC = () => {
  const submit = useSubmit()
  const navigation = useNavigation()

  const onFinish = async (values: FormReg) => {
    submit(values, { method: 'post' })
  }

  return (
    <AuthLayout height={380}>
      <Form
        size="large"
        onFinish={onFinish}
        initialValues={{ username: 'wgm', password: '111111', repassword: '111111' }}
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

        <Form.Item
          name="repassword"
          dependencies={['password']}
          validateFirst
          rules={[
            { required: true, message: 'Please confirm your Password!' },
            { pattern: /^\S{6,15}$/, message: '6-15位的非空字符串!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The new password that you entered do not match!'))
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item>
          <Space direction="vertical">
            <Button
              type="primary"
              htmlType="submit"
              loading={navigation.state !== 'idle' && { delay: 200 }}
            >
              Register
            </Button>
            <div>
              <Link className={styles.link} to="/login">
                Login now!
              </Link>
            </div>
          </Space>
        </Form.Item>
      </Form>
    </AuthLayout>
  )
}

export const action = async ({ request }: ActionFunctionArgs) => {
  let formData = await request.formData()
  const [err, res] = await to(registry(formData))
  if (err) return null
  message.success(res.message)
  return redirect('/login?username=' + formData.get('username'))
}

export default Registry
