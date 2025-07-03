// Google Sheets API를 위한 타입 정의
type GoogleSheetsData = [string, string, string]

// Generator를 활용한 데이터 처리 함수
function* processSheetsData(data: any[]): Generator<string[], void, unknown> {
  for (const row of data) {
    if (Array.isArray(row) && row.length > 0) {
      yield row.map((cell) => String(cell))
    }
  }
}

// Google Sheets API 호출 함수 (API 키만 사용)
const fetchGoogleSheetsData = async (): Promise<Array<GoogleSheetsData>> => {
  try {
    const apiKey = __GOOGLE_API_KEY__

    if (!apiKey) {
      throw new Error('Google API 키가 설정되지 않았습니다.')
    }

    // API 키만으로 Google Sheets API 호출
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/1aislcoC7c-7ZxxXwf8wubUzHJbB_XcqwwRGT907lIVc/values/A2:C150?key=${apiKey}`
    )

    if (!response.ok) {
      throw new Error(`Google Sheets API 오류: ${response.status}`)
    }

    const data = await response.json()

    return Array.from(processSheetsData(data.values || [])) as Array<GoogleSheetsData>
  } catch (error) {
    return []
  }
}

export default fetchGoogleSheetsData
