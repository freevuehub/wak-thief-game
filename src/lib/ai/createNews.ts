import { GenerateContentResponse } from '@google/genai'
import { ai } from '.'
import type { NewsResponse } from '@/types'
import { GEMINI_MODELS } from '@/constants'

const createNews = async (prompt: string): Promise<NewsResponse> => {
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: GEMINI_MODELS.FLASH_LIGHT,
    contents: prompt,
    config: { responseMimeType: 'application/json' },
  })

  let jsonStr = response.text?.trim() || ''

  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s
  const match = jsonStr.match(fenceRegex)
  if (match && match[2]) jsonStr = match[2].trim()

  try {
    return JSON.parse(jsonStr) as NewsResponse
  } catch (error) {
    console.error('Failed to parse JSON from Gemini:', error)
    return {
      main: [],
      etc: [],
    }
  }
}

export default createNews
