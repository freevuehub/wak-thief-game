import { GenerateContentResponse } from '@google/genai'
import { ai } from '.'
import type { Area } from '@/types'
import { GEMINI_MODELS } from '@/constants'

const createMap =
  (prompt: string) =>
  async (_: string): Promise<{ area: Array<Area> }> => {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODELS.FLASH,
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    })

    let jsonStr = response.text?.trim() || ''

    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s
    const match = jsonStr.match(fenceRegex)
    if (match && match[2]) jsonStr = match[2].trim()

    try {
      return JSON.parse(jsonStr) as { area: Array<Area> }
    } catch (error) {
      console.error('Failed to parse JSON from Gemini:', error)
      return { area: [] }
    }
  }

export default createMap
