import { useState, useEffect, useCallback } from 'react'
import { Button } from 'antd'

// 阿里面试题
async function getTestData() {
  const res = await fetch('/api/registry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      username: 'wgm',
      password: '123',
    }), // body data type must match "Content-Type" header
  })
  return res.json()
}

function useRequest(service) {
  // 请实现这个自定义 hook
  const [result, setResult] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const run = useCallback(async () => {
    setLoading(true)
    try {
      setResult(await service())
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    data: result,
    loading,
    error,
    run,
  }
}

const AMap = () => {
  const { data, loading, error, run } = useRequest(getTestData)

  if (loading) return '正在请求数据...'

  if (error) return `请求异常：${error}`

  return (
    <div>
      <div>请求结果：</div>
      <div>{JSON.stringify(data)}</div>
      <Button onClick={run}>刷新数据</Button>
    </div>
  )
}

export default AMap
