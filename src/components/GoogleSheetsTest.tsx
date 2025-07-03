import React, { useState } from 'react'
import fetchData from '../services/googleSheetsService'

const GoogleSheetsTest: React.FC = () => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await fetchData()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 에러가 발생했습니다.')
      console.error('데이터 가져오기 실패:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Google Sheets API 테스트</h2>

      <button
        onClick={handleFetchData}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? '데이터 가져오는 중...' : '데이터 가져오기'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>에러:</strong> {error}
        </div>
      )}

      {data && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">가져온 데이터:</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>

          {data.values && (
            <div className="mt-4">
              <h4 className="text-md font-semibold mb-2">스프레드시트 데이터:</h4>
              <ul className="list-disc list-inside">
                {data.values.map((row: any[], index: number) => (
                  <li key={index} className="mb-1">
                    {row.join(', ')}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default GoogleSheetsTest
