import React, { useState } from 'react'
import { Button, Drawer, Space } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import styles from './options.module.less'

const RootOpts: React.FC = () => {
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <div className={styles.right}>
      <Space>
        <Button type="text" icon={<SettingOutlined />} onClick={showDrawer}>
          admin
        </Button>
        <Drawer title="Basic Drawer" onClose={onClose} open={open}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
        <Button>logout</Button>
      </Space>
    </div>
  )
}

export default RootOpts
