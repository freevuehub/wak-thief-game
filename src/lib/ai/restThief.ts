import { GenerateContentResponse } from '@google/genai'
import { ai } from '.'
import type { RestThiefParams, RestThiefResponse } from '@/types'
import { GEMINI_MODELS } from '@/constants'

const restThief =
  (prompt: string) =>
  async (params: RestThiefParams): Promise<RestThiefResponse> => {
    prompt = prompt.replace(/\$\{name\}/g, params.name)
    prompt = prompt.replace(/\$\{personality\}/g, params.personality || '')
    prompt = prompt.replace(/\$\{background\}/g, params.background || '')
    prompt = prompt.replace(/\$\{character\}/g, params.character || '')
    prompt = prompt.replace(/\$\{cost\}/g, params.cost.toString() || '')
    prompt = prompt.replace(/\$\{loyalty\}/g, params.loyalty.toString() || '')
    prompt = prompt.replace(/\$\{event\}/g, params.event || '')

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
      return JSON.parse(jsonStr) as RestThiefResponse
    } catch (error) {
      console.error('Failed to parse JSON from Gemini:', error)
      return {
        dialogue: [
          '보스, 휴식 시간을 주셔서 감사합니다.',
          '잠시 쉬면서 다음 작전을 준비하겠습니다.',
          '체력을 회복하고 더 좋은 성과를 내겠습니다.',
        ],
        feelings: '휴식을 받아서 안도감이 들지만, 동시에 더 열심히 일해야겠다는 의지도 생겨요.',
      }
    }
  }

export default restThief
