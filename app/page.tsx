'use client'

import { useState, useEffect } from 'react'

const apiEndpoints = [
  {
    name: '获取单个 Item',
    method: 'GET',
    path: '/api/v0/item/{id}',
    description: '根据 ID 获取单个 item（story、comment、job、poll 等）',
    params: [
      { name: 'id', type: 'number', required: true, description: 'Item 的 ID' }
    ],
    example: '${API_BASE_URL}/api/v0/item/8863'
  },
  {
    name: '获取用户信息',
    method: 'GET',
    path: '/api/v0/user/{id}',
    description: '根据用户名获取用户信息',
    params: [
      { name: 'id', type: 'string', required: true, description: '用户名' }
    ],
    example: '${API_BASE_URL}/api/v0/user/jl'
  },
  {
    name: '获取 Top Stories',
    method: 'GET',
    path: '/api/v0/topstories',
    description: '获取当前 Top Stories 的 ID 数组（最多 500 个）',
    params: [],
    example: '${API_BASE_URL}/api/v0/topstories'
  },
  {
    name: '获取 New Stories',
    method: 'GET',
    path: '/api/v0/newstories',
    description: '获取当前 New Stories 的 ID 数组（最多 500 个）',
    params: [],
    example: '${API_BASE_URL}/api/v0/newstories'
  },
  {
    name: '获取 Best Stories',
    method: 'GET',
    path: '/api/v0/beststories',
    description: '获取当前 Best Stories 的 ID 数组（最多 500 个）',
    params: [],
    example: '${API_BASE_URL}/api/v0/beststories'
  },
  {
    name: '获取 Ask Stories',
    method: 'GET',
    path: '/api/v0/askstories',
    description: '获取当前 Ask Stories 的 ID 数组（最多 200 个）',
    params: [],
    example: '${API_BASE_URL}/api/v0/askstories'
  },
  {
    name: '获取 Show Stories',
    method: 'GET',
    path: '/api/v0/showstories',
    description: '获取当前 Show Stories 的 ID 数组（最多 200 个）',
    params: [],
    example: '${API_BASE_URL}/api/v0/showstories'
  },
  {
    name: '获取 Job Stories',
    method: 'GET',
    path: '/api/v0/jobstories',
    description: '获取当前 Job Stories 的 ID 数组（最多 200 个）',
    params: [],
    example: '${API_BASE_URL}/api/v0/jobstories'
  },
  {
    name: '获取更新信息',
    method: 'GET',
    path: '/api/v0/updates',
    description: '获取最近更新的 items 和 profiles',
    params: [],
    example: '${API_BASE_URL}/api/v0/updates'
  },
  {
    name: '获取最大 Item ID',
    method: 'GET',
    path: '/api/v0/maxitem',
    description: '获取当前最大的 item ID',
    params: [],
    example: '${API_BASE_URL}/api/v0/maxitem'
  }
]

interface TestState {
  loading: boolean
  response: any
  error: string | null
}

export default function Home() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [baseUrl, setBaseUrl] = useState('')
  const [testStates, setTestStates] = useState<Record<number, TestState>>({})

  useEffect(() => {
    setBaseUrl(window.location.origin)
  }, [])

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const getExampleUrl = (example: string) => {
    return example.replace('${API_BASE_URL}', baseUrl)
  }

  const getTestUrl = (endpoint: typeof apiEndpoints[0], index: number) => {
    let url = baseUrl + endpoint.path
    // 替换路径参数
    if (endpoint.path.includes('{id}')) {
      if (endpoint.name.includes('Item')) {
        url = url.replace('{id}', '8863')
      } else if (endpoint.name.includes('用户')) {
        url = url.replace('{id}', 'jl')
      }
    }
    return url
  }

  const testEndpoint = async (endpoint: typeof apiEndpoints[0], index: number) => {
    // 设置加载状态
    setTestStates(prev => ({
      ...prev,
      [index]: { loading: true, response: null, error: null }
    }))

    try {
      const url = getTestUrl(endpoint, index)
      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`)
      }

      // 设置成功响应
      setTestStates(prev => ({
        ...prev,
        [index]: { loading: false, response: data, error: null }
      }))
    } catch (error: any) {
      // 设置错误
      setTestStates(prev => ({
        ...prev,
        [index]: { loading: false, response: null, error: error.message || '请求失败' }
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            HackerNews API
          </h1>
          <p className="text-lg text-gray-600">
            HackerNews API 代理服务 - 所有 API 端点文档
          </p>
          <p className="text-sm text-gray-500 mt-2">
            基于 <a href="https://github.com/HackerNews/API" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">HackerNews/API</a>
          </p>
        </header>

        <div className="space-y-6">
          {apiEndpoints.map((endpoint, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {endpoint.method}
                    </span>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {endpoint.name}
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-4">{endpoint.description}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-700">路径:</span>
                  <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono text-gray-800">
                    {endpoint.path}
                  </code>
                </div>
              </div>

              {endpoint.params.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    参数:
                  </h3>
                  <div className="bg-gray-50 rounded p-3">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">
                            参数名
                          </th>
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">
                            类型
                          </th>
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">
                            必填
                          </th>
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">
                            说明
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {endpoint.params.map((param, paramIndex) => (
                          <tr
                            key={paramIndex}
                            className="border-b border-gray-100 last:border-0"
                          >
                            <td className="py-2 px-3">
                              <code className="text-blue-600">{param.name}</code>
                            </td>
                            <td className="py-2 px-3 text-gray-600">
                              {param.type}
                            </td>
                            <td className="py-2 px-3">
                              {param.required ? (
                                <span className="text-red-600">是</span>
                              ) : (
                                <span className="text-gray-400">否</span>
                              )}
                            </td>
                            <td className="py-2 px-3 text-gray-600">
                              {param.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-700">
                    示例请求:
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => testEndpoint(endpoint, index)}
                      disabled={testStates[index]?.loading}
                      className="text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-3 py-1 rounded flex items-center gap-1 transition-colors"
                    >
                      {testStates[index]?.loading ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          测试中...
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          测试
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => copyToClipboard(baseUrl ? getExampleUrl(endpoint.example) : endpoint.example, index)}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      {copiedIndex === index ? (
                        <>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          已复制
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                          复制
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="bg-gray-900 rounded p-4 overflow-x-auto mb-3">
                  <code className="text-green-400 text-sm font-mono">
                    {baseUrl ? getExampleUrl(endpoint.example) : '加载中...'}
                  </code>
                </div>

                {/* 响应数据展示 */}
                {testStates[index] && (
                  <div className="mt-3">
                    {testStates[index].error ? (
                      <div className="bg-red-50 border border-red-200 rounded p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <svg
                            className="w-5 h-5 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <h4 className="text-sm font-semibold text-red-800">错误</h4>
                        </div>
                        <p className="text-sm text-red-700">{testStates[index].error}</p>
                      </div>
                    ) : testStates[index].response ? (
                      <div className="bg-green-50 border border-green-200 rounded p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-5 h-5 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <h4 className="text-sm font-semibold text-green-800">响应数据</h4>
                          </div>
                          <button
                            onClick={() => {
                              const jsonStr = JSON.stringify(testStates[index].response, null, 2)
                              navigator.clipboard.writeText(jsonStr)
                              alert('响应数据已复制到剪贴板')
                            }}
                            className="text-xs text-green-700 hover:text-green-900"
                          >
                            复制响应
                          </button>
                        </div>
                        <div className="bg-gray-900 rounded p-3 overflow-x-auto max-h-96 overflow-y-auto">
                          <pre className="text-green-400 text-xs font-mono">
                            {JSON.stringify(testStates[index].response, null, 2)}
                          </pre>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>HackerNews API 代理服务</p>
        </footer>
      </div>
    </div>
  )
}

