import { GenerateContentResponse } from '@google/genai'
import { ai } from '.'
import type { ThiefResponse, Thief } from '@/types'
import { GEMINI_MODELS } from '@/constants'

type Params = Pick<
  Thief,
  'name' | 'personality' | 'background' | 'dialogue' | 'character' | 'cost' | 'loyalty' | 'fatigue'
>

const createThiefResponse =
  (prompt: string) =>
  async (params: Params): Promise<ThiefResponse> => {
    prompt = prompt.replace(/\$\{name\}/g, params.name)
    prompt = prompt.replace(/\$\{personality\}/g, params.personality || '')
    prompt = prompt.replace(/\$\{background\}/g, params.background || '')
    prompt = prompt.replace(/\$\{character\}/g, params.character || '')
    prompt = prompt.replace(/\$\{cost\}/g, params.cost.toString() || '')
    prompt = prompt.replace(/\$\{loyalty\}/g, params.loyalty.toString() || '')

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
