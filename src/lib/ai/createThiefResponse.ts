import { GenerateContentResponse } from '@google/genai'
import { ai } from '.'
import type { ThiefResponse, Thief } from '@/types'
import { GEMINI_MODELS } from '@/constants'
import { replacePrompt } from '@/lib'

type Params = Pick<
  Thief,
  'name' | 'personality' | 'background' | 'character' | 'cost' | 'loyalty' | 'fatigue'
>

const createThiefResponse =
  (prompt: string) =>
  async (params: Params): Promise<ThiefResponse> => {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODELS.FLASH_LIGHT,
      contents: replacePrompt(prompt)({
        name: params.name,
        personality: params.personality,
        background: params.background,
        character: params.character,
        cost: params.cost,
        loyalty: params.loyalty,
      }),
      config: { responseMimeType: 'application/json' },
    })

    let jsonStr = response.text?.trim() || ''

    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s
    const match = jsonStr.match(fenceRegex)
    if (match && match[2]) jsonStr = match[2].trim()

    try {
      return JSON.parse(jsonStr) as ThiefResponse
    } catch (error) {
      console.error('Failed to parse JSON from Gemini:', error)
      return {
        dialogue: [],
        feelings: '',
      }
    }
  }

export default createThiefResponse
